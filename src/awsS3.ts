import AWS from "aws-sdk";
import React from "react";
import s3config from "./s3config.json";

export async function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const ACCESS_KEY = s3config.accessKey;
  const SECRET_ACCESS_KEY = s3config.secretAccessKey;
  const REGION = s3config.region;
  const S3_BUCKET = s3config.Bucket;

  // AWS ACCESS KEY를 세팅합니다.
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  // 버킷에 맞는 이름과 리전을 설정합니다.
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];

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
}
