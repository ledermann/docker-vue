<template>
  <div class="content">
    <silentbox-group v-if="clips.length">
      <template v-for="(clip, index) in clips">
        <div class="clip" :key="index">
          <silentbox-item v-if="clip.large" :src="clip.large.url">
            <figure class="image is-128x128">
              <img :src="clip.thumbnail.url">
            </figure>
          </silentbox-item>

          <template v-else>
            <figure class="image is-128x128" >
              <img :src="clip.preview" :class="{ inProgress: clip.progress < 100 }" >
              <progress v-if="clip.progress < 100" class="progress is-success is-small" :value="clip.progress" max="100" />
            </figure>
          </template>

          <a v-if="!post.clips_attributes[index]._destroy" class="button is-small" @click="removeClip(index)">
            <b-icon icon="trash" size="is-small"/>
          </a>
          <a v-else class="button is-small" @click="restoreClip(index)">
            <b-icon icon="circle" size="is-small"/>
          </a>
        </div>
      </template>
    </silentbox-group>

    <div class="file">
      <label class="file-label">
        <input class="file-input" type="file" @change="onFileChange" multiple>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Upload images
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jsonToFormData from '@/api/object-to-formdata'

export default {
  name: 'ImageUploader',

  props: ['post', 'clips'],

  data: () => {
    return {
    }
  },

  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }

      for (var file of files) {
        this.uploadImage(file)
      }
    },

    uploadImage (file) {
      var vm = this

      var reader = new FileReader()
      reader.onload = (e) => {
        var clipIndex = vm.post.clips_attributes.length
        vm.post.clips_attributes.push({
          image: null
        })
        vm.clips.push({
          preview: e.target.result,
          progress: 0
        })

        this.presign(file)
          .then((data) => {
            this.s3Upload(data.url, data.fields, file, clipIndex)
              .then(() => {
                var uploadedFileData = JSON.stringify({
                  id: data.fields['key'].match(/cache\/(.+)/)[1], // remove the Shrine storage prefix
                  storage: 'cache',
                  metadata: {
                    size: file.size,
                    filename: file.name,
                    mime_type: file.type
                  }
                })

                vm.post.clips_attributes[clipIndex].image = uploadedFileData
              })
              .catch((error) => {
                console.log('Upload failed', error)
              })
          })
          .catch((error) => {
            console.log('Presign failed', error)
          })
      }

      reader.readAsDataURL(file)
    },

    presign (file) {
      return this.$http.get('/presign?filename=' + file.name)
        .then(response => {
          return response.data
        })
    },

    s3Upload (url, fields, file, clipIndex) {
      var vm = this

      var formData = jsonToFormData(fields)
      formData.append('file', file)

      const axiosS3 = axios.create({
        baseURL: url
      })

      const axiosOptions = {
        method: 'POST',
        data: formData,
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          vm.clips[clipIndex].progress = percentCompleted
        }
      }

      return axiosS3(axiosOptions)
    },

    removeClip (index) {
      const clip = this.post.clips_attributes[index]
      if (clip.id == null) {
        this.post.clips_attributes.splice(index, 1)
        this.clips.splice(index, 1)
      } else {
        this.post.clips_attributes[index]._destroy = true
      }
    },

    restoreClip (index) {
      this.post.clips_attributes[index]._destroy = 0
    }
  }
}
</script>

<style lang="sass">
  .clip
    display: inline-block
    position: relative

    img
      object-fit: cover
      width: 128px
      height: 128px

      &.inProgress
        opacity: 0.3

    progress
      position: absolute
      bottom: 10px
      left: 0
      right: 0
      width: 90%
      margin: 0 auto

    .button
      position: absolute
      top: 10px
      left: 10px
      display: none

    &:hover
      .button
        display: block
</style>
