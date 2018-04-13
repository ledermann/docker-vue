// Code taken from Uppy
// https://github.com/transloadit/uppy/blob/master/src/plugins/ThumbnailGenerator/index.js

// The MIT License (MIT)
// Copyright (c) 2018 Transloadit
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

export default class ThumbnailGenerator {
  constructor (opts) {
    this.queue = []
    this.queueProcessing = false
    const defaultOptions = {
      thumbnailWidth: 128
    }
    this.opts = Object.assign({}, defaultOptions, opts)
    this.addToQueue = this.addToQueue.bind(this)
    this.onRestored = this.onRestored.bind(this)
  }

  /**
   * Create a thumbnail for the given Uppy file object.
   *
   * @param {{data: Blob}} file
   * @param {number} width
   * @return {Promise}
   */
  createThumbnail (originalUrl, targetWidth) {
    const onload = new Promise((resolve, reject) => {
      const image = new Image()
      image.src = originalUrl
      image.onload = () => {
        URL.revokeObjectURL(originalUrl)
        resolve(image)
      }
      image.onerror = () => {
        // The onerror event is totally useless unfortunately, as far as I know
        URL.revokeObjectURL(originalUrl)
        reject(new Error('Could not create thumbnail'))
      }
    })
    return onload
      .then(image => {
        const targetHeight = this.getProportionalHeight(image, targetWidth)
        const canvas = this.resizeImage(image, targetWidth, targetHeight)
        return this.canvasToBlob(canvas, 'image/png')
      })
      .then(blob => {
        return URL.createObjectURL(blob)
      })
  }

  /**
   * Make sure the image doesn’t exceed browser/device canvas limits.
   * For ios with 256 RAM and ie
   */
  protect (image) {
    // https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element
    var ratio = image.width / image.height
    var maxSquare = 5000000 // ios max canvas square
    var maxSize = 4096 // ie max canvas dimensions
    var maxW = Math.floor(Math.sqrt(maxSquare * ratio))
    var maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio))
    if (maxW > maxSize) {
      maxW = maxSize
      maxH = Math.round(maxW / ratio)
    }
    if (maxH > maxSize) {
      maxH = maxSize
      maxW = Math.round(ratio * maxH)
    }
    if (image.width > maxW) {
      var canvas = document.createElement('canvas')
      canvas.width = maxW
      canvas.height = maxH
      canvas.getContext('2d').drawImage(image, 0, 0, maxW, maxH)
      image.src = 'about:blank'
      image.width = 1
      image.height = 1
      image = canvas
    }
    return image
  }

  /**
   * Resize an image to the target `width` and `height`.
   *
   * Returns a Canvas with the resized image on it.
   */
  resizeImage (image, targetWidth, targetHeight) {
    // Resizing in steps refactored to use a solution from
    // https://blog.uploadcare.com/image-resize-in-browsers-is-broken-e38eed08df01
    image = this.protect(image)
    var steps = Math.ceil(Math.log2(image.width / targetWidth))
    if (steps < 1) {
      steps = 1
    }
    var sW = targetWidth * Math.pow(2, steps - 1)
    var sH = targetHeight * Math.pow(2, steps - 1)
    var x = 2
    while (steps--) {
      var canvas = document.createElement('canvas')
      canvas.width = sW
      canvas.height = sH
      canvas.getContext('2d').drawImage(image, 0, 0, sW, sH)
      image = canvas
      sW = Math.round(sW / x)
      sH = Math.round(sH / x)
    }
    return image
  }

  /**
   * Save a <canvas> element's content to a Blob object.
   *
   * @param {HTMLCanvasElement} canvas
   * @return {Promise}
   */
  canvasToBlob (canvas, type, quality) {
    if (canvas.toBlob) {
      return new Promise(resolve => {
        canvas.toBlob(resolve, type, quality)
      })
    }
    return Promise.resolve().then(() => {
      return this.dataURItoBlob(canvas.toDataURL(type, quality), {})
    })
  }
  getProportionalHeight (img, width) {
    const aspect = img.width / img.height
    return Math.round(width / aspect)
  }

  /**
   * Set the preview URL for a file.
   */
  setPreviewURL (fileID, preview) {
    const { files } = this.uppy.state
    this.uppy.setState({
      files: Object.assign({}, files, {
        [fileID]: Object.assign({}, files[fileID], {
          preview: preview
        })
      })
    })
  }

  addToQueue (item) {
    this.queue.push(item)
    if (this.queueProcessing === false) {
      this.processQueue()
    }
  }

  processQueue () {
    this.queueProcessing = true
    if (this.queue.length > 0) {
      const current = this.queue.shift()
      return this.requestThumbnail(current)
        .catch(err => { }) // eslint-disable-line handle-callback-err
        .then(() => this.processQueue())
    } else {
      this.queueProcessing = false
    }
  }

  requestThumbnail (file) {
    if (this.isPreviewSupported(file.type) && !file.isRemote) {
      return this.createThumbnail(file, this.opts.thumbnailWidth)
        .then(preview => {
          this.setPreviewURL(file.id, preview)
        })
        .catch(err => {
          console.warn(err.stack || err.message)
        })
    }
    return Promise.resolve()
  }

  onRestored () {
    const fileIDs = Object.keys(this.uppy.getState().files)
    fileIDs.forEach(fileID => {
      const file = this.uppy.getFile(fileID)
      if (!file.isRestored) { return }
      // Only add blob URLs; they are likely invalid after being restored.
      if (!file.preview || /^blob:/.test(file.preview)) {
        this.addToQueue(file)
      }
    })
  }

  dataURItoBlob (dataURI, opts, toFile) {
    // get the base64 data
    var data = dataURI.split(',')[1]

    // user may provide mime type, if not get it from data URI
    var mimeType =
      opts.mimeType ||
      dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]

    // default to plain/text if data URI has no mimeType
    if (mimeType == null) {
      mimeType = 'plain/text'
    }

    var binary = atob(data)
    var array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }

    // Convert to a File?
    if (toFile) {
      return new File([new Uint8Array(array)], opts.name || '', {
        type: mimeType
      })
    }

    return new Blob([new Uint8Array(array)], { type: mimeType })
  }

  isPreviewSupported (fileType) {
    if (!fileType) return false
    const fileTypeSpecific = fileType.split('/')[1]
    // list of images that browsers can preview
    if (/^(jpeg|gif|png|svg|svg\+xml|bmp)$/.test(fileTypeSpecific)) {
      return true
    }
    return false
  }
}
