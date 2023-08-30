import React, { FormEvent, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { onFileUpload, readObject } from "../awsS3";
import { Button } from "@mui/material";
import s3config from "../s3config.json";
import axios from "axios";
import { Spacing, Wrap } from "../styledComponent";
import { FlowFlags } from "typescript";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";

const Upload: React.FC = () => {
  const imgRef = useRef<HTMLInputElement>(null);

  const [previewImg, setPreviewImg] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
  );

  const [currentFile, setCurrentFile] = useState<File>();
  const [postID, setPostID] = useState<string>("");
  const [postName, setPostName] = useState<string>("");
  const [fileExtension, setFileExtension] = useState<string>("");
  const [newFile, setNewFile] = useState<File>();

  function changeImg(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("이미지 변환됨");
    if (e.target.files) {
      setCurrentFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    console.log(newFile);
    if (currentFile) {
      setPreviewImg(URL.createObjectURL(currentFile));
      const lexicalFileExtension = currentFile.name.split(".")[1];
      setFileExtension(lexicalFileExtension);
      const uniqueImageId = uuidv4();
      setPostID(uniqueImageId);
      const lexicalNewFile = new File(
        //*파일의 메타데이터
        [currentFile],
        //*파일의 이름
        `${uniqueImageId}.${lexicalFileExtension}`,
        {
          type: currentFile.type,
        }
      );
      setNewFile(lexicalNewFile);
    }
  }, [currentFile]);

  function changePostName(e: React.ChangeEvent<HTMLInputElement>) {
    setPostName(e.target.value);
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();
    try {
      if (newFile) {
        await onFileUpload(newFile); //! 파일업로드 함수
        console.log("s3에 업로드동작됨");
      }
    } catch (err) {
      alert("업로드 에러발생");
      console.log("에러발생 함수중지");
      console.error(err);
      return;
    }
    console.log(
      `업로드한 객체의 이름 :  ${newFile?.name} 파일형식 = ${fileExtension}`
    );
    try {
      const response = await axios.post("http://localhost:5000/api/post", {
        uploaderID: sessionStorage.getItem("userID"),
        postID: postID,
        postName: postName,
        imgExtension: fileExtension,
      });
      console.log(response.data.id);
      setPostID(response.data.id);
    } catch (err) {
      console.error(err);
      alert("에러발생");
    }
  }

  return (
    <>
      <Spacing height="100px" />
      <Form onSubmit={(e) => submitForm(e)}>
        <img width={"300px"} src={previewImg} alt="" />
        <ImgUpload ref={imgRef} type="file" onChange={(e) => changeImg(e)} />
        <input
          value={postName}
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
