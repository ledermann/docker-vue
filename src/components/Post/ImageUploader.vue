<template>
  <div class="content">
    <silentbox-group>
      <silentbox-item v-for="clip in post.clips" :src="clip.large.url" :key="clip.id">
        <figure class="image is-128x128">
          <img :src="clip.thumbnail.url">
        </figure>
      </silentbox-item>
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

    var uppy = Uppy({
      thumbnailGeneration: true,
      autoProceed: true,
      restrictions: {
        maxFileSize: false,
        allowedFileTypes: ['image/*']
      }
    })

    uppy.use(FileInput, {
      target: '.UppyForm',
      allowMultipleFiles: true,
      locale: {
        strings: {
          chooseFiles: '+ Upload image'
        }
      }
    })

    uppy.use(AwsS3, {
      getUploadParameters: function (file) {
        return fetch('https://docker-rails.dev/api/v1/presign?filename=' + file.name)
          .then(function (response) { return response.json() })
      }
    })

    uppy.run()

    uppy.on('upload-success', function (fileId, data) {
      // retrieve uppy's file object (`file.data` contains the actual JavaScript File object)
      var file = uppy.getFile(fileId)

      var uploadedFileData = JSON.stringify({
        id: file.meta['key'].match(/cache\/(.+)/)[1], // remove the Shrine storage prefix
        storage: 'cache',
        metadata: {
          size: file.size,
          filename: file.name,
          mime_type: file.type
        }
      })

      if (!that.post.clips_attributes) {
        that.post.clips_attributes = []
      }
      that.post.clips_attributes.push({image: uploadedFileData})

      that.post.clips.push({
        thumbnail: {
          url: file.preview
        },
        large: {
          url: file.preview
        }
      })
    })
  }
}
</script>
