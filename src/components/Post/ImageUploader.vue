<template>
  <div class="content">
    <silentbox-group v-if="post.clips.length">
      <template v-for="clip in post.clips">
        <silentbox-item v-if="clip.large" :src="clip.large.url" :key="clip.id">
          <figure class="image is-128x128">
            <img :src="clip.thumbnail.url">
          </figure>
        </silentbox-item>

        <figure v-else class="image is-128x128" :key="clip.id">
          <b-icon icon="circle-notch" size="is-large" custom-class="fa-spin" />
        </figure>
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
        return fetch('https://docker-rails.dev/api/v1/presign?filename=' + file.name)
          .then(function (response) { return response.json() })
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

      that.post.clips = that.post.clips || []
      that.post.clips.push({image: uploadedFileData})
    }).run()
  }
}
</script>
