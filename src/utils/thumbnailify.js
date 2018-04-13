export default function thumbnailify (base64Image, targetSize, callback) {
  var img = new Image()

  img.onload = function () {
    var width = img.width
    var height = img.height
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')

    canvas.width = canvas.height = targetSize

    ctx.drawImage(
      img,
      width > height ? (width - height) / 2 : 0,
      height > width ? (height - width) / 2 : 0,
      width > height ? height : width,
      width > height ? height : width,
      0, 0,
      targetSize, targetSize
    )

    callback(canvas.toDataURL())
  }

  img.src = base64Image
}
