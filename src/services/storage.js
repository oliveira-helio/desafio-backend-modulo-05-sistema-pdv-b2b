const s3 = require('../config/aws')

const uploadFile = async (path, buffer, mimetype) => {
  const file = await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise()

  return {
    url: file.Location,
    path: file.Key,
  }
}

module.exports = {
  uploadFile,
}
