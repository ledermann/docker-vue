<template>
  <div class="content">
    <silentbox-group v-if="post.clips_attributes.length">
      <template v-for="(clip, index) in post.clips_attributes">
        <div class="clip" :key="clip.id">
          <silentbox-item v-if="clip.large" :src="clip.large.url">
            <figure class="image is-128x128">
              <img :src="clip.thumbnail.url">
            </figure>
          </silentbox-item>

          <figure v-else class="image is-128x128" >
            <b-icon icon="circle-notch" size="is-large" custom-class="fa-spin" />
          </figure>

          <a v-if="!post.clips_attributes[index]._destroy" class="button is-small" @click="removeClip(index)">
            <b-icon icon="trash" size="is-small"/>
          </a>
          <a v-else class="button is-small" @click="restoreClip(index)">
            <b-icon icon="circle" size="is-small"/>
          </a>
        </div>
      </template>
    </silentbox-group>

    <div class="UppyForm" />
  </div>
</template>

<script>
import 'uppy/dist/uppy.css'

const Uppy = require('uppy/lib/core')
const FileInput = require('uppy/lib/plugins/FileInput')
const AwsS3 = require('uppy/lib/plugins/AwsS3')

export default {
  name: 'ImageUploader',

  props: ['post'],

  methods: {
    removeClip (index) {
      const clip = this.post.clips_attributes[index]
      if (clip.id == null) {
        this.post.clips_attributes.splice(index, 1)
      } else {
        this.post.clips_attributes[index]._destroy = true
      }
    },

    restoreClip (index) {
      this.post.clips_attributes[index]._destroy = 0
    }
  },

  mounted () {
    var that = this

    Uppy({
      thumbnailGeneration: true,
      autoProceed: true,
      restrictions: {
        maxFileSize: false,
        allowedFileTypes: ['image/*']
      }
    }).use(FileInput, {
      target: '.UppyForm',
      allowMultipleFiles: true,
      locale: {
        strings: {
          chooseFiles: '+ Upload image'
        }
      }
    }).use(AwsS3, {
      getUploadParameters: function (file) {
        return that.$http.get('/presign?filename=' + file.name)
          .then(response => {
            return response.data
          })
      }
    }).on('upload-success', (file, resp, uploadURL) => {
      var uploadedFileData = JSON.stringify({
        id: file.meta['key'].match(/cache\/(.+)/)[1], // remove the Shrine storage prefix
        storage: 'cache',
        metadata: {
          size: file.size,
          filename: file.name,
          mime_type: file.type
        }
      })

      that.post.clips_attributes.push({image: uploadedFileData})
    }).run()
  }
}
</script>

<style lang="sass">
  .clip
    display: inline-block
    position: relative

    .button
      position: absolute
      top: 10px
      left: 10px
      display: none

    &:hover
      .button
        display: block
</style>
