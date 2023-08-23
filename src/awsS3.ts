import AWS from "aws-sdk";
import s3config from "./s3config.json";

const ACCESS_KEY = s3config.accessKey;
const SECRET_ACCESS_KEY = s3config.secretAccessKey;
const REGION = s3config.region;
const S3_BUCKET = s3config.Bucket;

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export async function onFileUpload(file: File) {
  // AWS ACCESS KEY를 세팅합니다.
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  // 버킷에 맞는 이름과 리전을 설정합니다.

  // 파일과 파일 이름을 넘겨주면 됩니다.
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      alert("SUCCESS");
    })
    .send((err) => {
      if (err) console.log(err);
    });
}

function readObject() {
  var params = {
    Bucket: S3_BUCKET, // replace with your bucket name
  };
  myBucket.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
}
