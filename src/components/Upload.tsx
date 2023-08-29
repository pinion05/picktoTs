import React, { FormEvent, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { onFileUpload, readObject } from "../awsS3";
import { Button } from "@mui/material";
import s3config from "../s3config.json";
import axios from "axios";
import { Wrap } from "../styledComponent";
import { FlowFlags } from "typescript";
import { v4 as uuidv4 } from "uuid";

const Upload: React.FC = () => {
  const imgRef = useRef<HTMLInputElement>(null);

  const [newImg, setNewImg] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");
  const [postID, setPostID] = useState<string>("");
  const [fileExtension, setFileExtension] = useState<string>("");

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    if (imgRef.current && imgRef.current.files) {
      const oldFile = imgRef.current.files[0];
      setNewImg(URL.createObjectURL(oldFile));
      setFileExtension(oldFile.name.split(".")[1]);
      const uniqueImageId = uuidv4();
      const newFile = new File(
        //*파일의 메타데이터
        [oldFile],
        //*파일의 이름
        `${uniqueImageId}.${oldFile.name.split(".")[1]}`,
        {
          type: oldFile.type,
        }
      );

      try {
        await onFileUpload(newFile); //! 파일업로드 함수
        console.log("s3에 업로드동작됨");
      } catch (err) {
        alert("업로드 에러발생");
        console.log("에러발생 함수중지");
        console.error(err);
        return;
      }

      console.log(
        `업로드한 객체의 이름 :  ${newFile?.name} 파일형식 = ${
          oldFile.name.split(".")[1]
        }`
      );

      try {
        const response = await axios.post("http://localhost:5000/api/post", {
          uploaderID: sessionStorage.getItem("userID"),
          postID: uniqueImageId,
          postName: newFileName,
          imgExtension: oldFile.name.split(".")[1],
        });
        console.log(response.data.id);
        setPostID(response.data.id);
      } catch (err) {
        console.error(err);
        alert("에러발생");
      }
    }
  }

  function changePostName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewFileName(e.target.value);
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
