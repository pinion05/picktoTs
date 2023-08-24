import AWS from "aws-sdk";
import s3config from "./s3config.json";
import { data } from "autoprefixer";

const ACCESS_KEY = s3config.accessKey;
const SECRET_ACCESS_KEY = s3config.secretAccessKey;
const REGION = s3config.region;
const S3_BUCKET = s3config.Bucket;

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

// AWS ACCESS KEY를 세팅합니다.
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

export async function onFileUpload(file: File) {
  myBucket
    .putObject({
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    })
    .on("httpUploadProgress", (evt) => {
      alert("SUCCESS");
    })
    .send((err) => {
      if (err) console.log(err);
    });
}

export async function readList() {
  try {
    const list = await myBucket.listObjects({ Bucket: S3_BUCKET }).promise();
    return list;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function readObject(key: string) {
  try {
    const data = await myBucket
      .getObject({ Bucket: S3_BUCKET, Key: key })
      .promise();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
