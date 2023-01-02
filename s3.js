const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

require("dotenv").config();
// AWS.config.loadFromPath('./config.json');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_ACCESS_KEY;



// const s3 = new S3({
//   region,
//   accessKey,
//   secretAccessKey,
// });

S3.putObject({
  Body: 'hello',
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: "asdasdasd.txt"
})

// function uploadFile(file) {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: file.filename,
//   };

//   return s3.upload(uploadParams).promise();
// }

// exports.uploadFile = uploadFile;
