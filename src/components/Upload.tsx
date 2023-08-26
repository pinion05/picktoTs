import React, { FormEvent, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { onFileUpload, readObject } from "../awsS3";
import { Button } from "@mui/material";
import s3config from "../s3config.json";
import axios from "axios";
import { Wrap } from "../styledComponent";
import { FlowFlags } from "typescript";

const Upload: React.FC = () => {
  const [newImg, setNewImg] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");
  const [postID, setPostID] = useState<string>("");
  //

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    if (imgRef.current !== null && imgRef.current.files) {
      try {
        const response = await axios.post("http://localhost:5000/api/post", {
          uploaderID: sessionStorage.getItem("userID"),
          uploadImgName: newFileName,
        });
        console.log(response.data.id);
        setPostID(response.data.id);
      } catch (err) {
        console.error(err);
        alert("에러발생");
      }

      const oldFile = imgRef.current.files[0];
      const fileExtension = oldFile.name.split(".")[1];

      let newFile: File | null = null;

      switch (fileExtension) {
        //
        case "jpg":
          newFile = new File([oldFile], `${newFileName}.jpg`, {
            type: oldFile.type,
          });
          break;

        case "png":
          newFile = new File([oldFile], `${newFileName}.png`, {
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
    console.log(newFileName);
  }

  function clickSerch() {
    readObject("test.png");
  }

  function changeImg(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("이미지 변환됨");
  }

  return (
    <>
      <Form onSubmit={(e) => submitForm(e)}>
        <img width={"100px"} src={newImg} alt="" />
        <ImgUpload ref={imgRef} type="file" onChange={(e) => changeImg(e)} />
        <input
          value={newFileName}
          type="text"
          onChange={(e) => changePostName(e)}
        />
        <Button type="submit">업로드</Button>
      </Form>
      {/* <button onClick={() => clicktest()} /> */}
    </>
  );
};
export default Upload;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const ImgUpload = styled.input`
  width: 200px;
  height: 30px;
  margin: 1px;
`;

const PreviewIMg = styled.img`
  width: 1000px;
`;
