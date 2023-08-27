import AWS from "aws-sdk";
import s3config from "./s3config.json";

const myBucket = new AWS.S3({
  params: { Bucket: s3config.Bucket },
  region: s3config.region,
});

// AWS ACCESS KEY를 세팅합니다.

export async function onFileUpload(file: File) {
  AWS.config.update({
    accessKeyId: s3config.accessKey,
    secretAccessKey: s3config.secretAccessKey,
    // region: s3config.region,
  });
  myBucket
    .putObject({
      ACL: "public-read",
      Body: file,
      Bucket: s3config.Bucket,
      Key: file.name,
    })
    .on("httpUploadProgress", (evt) => {
      alert("파일 업로드됨");
    })
    .send((err) => {
      if (err) console.error(err);
    });
}

//*async로 구현하기
// export async function readList() {
//   try {
//     const list = await myBucket
//       .listObjects({ Bucket: s3config.Bucket })
//       .promise();
//     return list;
//   } catch (err) {
//     console.error("error is" + err);
//     throw err;
//   }
// }

export function readList() {
  AWS.config.update({
    accessKeyId: s3config.accessKey,
    secretAccessKey: s3config.secretAccessKey,
    region: s3config.region,
  });
  myBucket.listObjects({ Bucket: s3config.Bucket }, (err, data) => {
    console.log(data);
  });
}
//*async로 구현하기
// export async function readObject(key: string) {
//   try {
//     const data = await myBucket
//       .getObject({ Bucket: s3config.Bucket, Key: key })
//       .promise();
//     return data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

export function readObject(key: string) {
  AWS.config.update({
    accessKeyId: s3config.accessKey,
    secretAccessKey: s3config.secretAccessKey,
    region: s3config.region,
  });
  myBucket.getObject(
    { Bucket: s3config.Bucket, Key: "test.png" },
    (err, data) => {
      console.log(data);
      if (err) {
        console.error(err);
      }
    }
  );
}
