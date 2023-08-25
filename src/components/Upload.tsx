import React, { FormEvent, useRef, useState } from "react";
import { styled } from "styled-components";
import { onFileUpload, readObject } from "../awsS3";
import { Button } from "@mui/material";
import s3config from "../s3config.json";
import axios from "axios";

const Upload: React.FC = () => {
  const [newImg, setNewImg] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");
  const [postID, setPostID] = useState<string>("");
  //

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    //*이미지가 선택되었나 확인
    if (imgRef.current !== null && imgRef.current.files) {
      try {
        const response = await axios.post("http://localhost:5000/api/post", {
          uploaderID: sessionStorage.getItem("userID"),
        });
        console.log(response.data.id);
        setPostID(response.data.id);
      } catch (err) {
        console.error(err);
      }

      const oldFile = imgRef.current.files[0];
      const fileExtension = oldFile.name.split(".")[1];

      let newFile: File | null = null;

      switch (fileExtension) {
        //
        case "jpg":
          newFile = new File([oldFile], `${postID + 1}.jpg`, {
            type: oldFile.type,
          });
          break;

        case "png":
          newFile = new File([oldFile], `${postID + 1}.png`, {
            type: oldFile.type,
          });
          break;

        default:
          alert("지원하지 않는 파일 형식입니다.");
          break;
      }
      if (newFile) {
        console.log(newFile?.name);
        console.log(`${URL.createObjectURL(newFile)}`);
        setNewImg(URL.createObjectURL(newFile));
        onFileUpload(newFile); //! 파일업로드 함수
      }
    }
  }
  const imgRef = useRef<HTMLInputElement>(null);

  function changePostName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewFileName(e.target.value);
  }

  function clickSerch() {
    readObject("test.png");
  }

  return (
    <>
      <form onSubmit={(e) => submitForm(e)}>
        <img width={"100px"} src={newImg} alt="" />
        <ImgUpload ref={imgRef} type="file" />
        <Button type="submit">업로드</Button>
      </form>
      <button onClick={() => clickSerch()} />
      <PreviewIMg
        src={`https://${s3config.Bucket}.s3.${
          s3config.region
        }.amazonaws.com/${"test.png"}`}
        alt=""
      />
    </>
  );
};
export default Upload;

const ImgUpload = styled.input`
  width: 200px;
  height: 30px;
  margin: 1px;
`;

const PreviewIMg = styled.img`
  width: 1000px;
`;
