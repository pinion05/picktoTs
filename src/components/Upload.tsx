import React, { FormEvent, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import { Spacing, Wrap } from "../styledComponent";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Cookies } from "react-cookie";

const Upload: React.FC = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const [postName, setPostName] = useState<string>("");
  const [fileExtension, setFileExtension] = useState<string>("");
  const cookies = new Cookies();

  const [previewImg, setPreviewImg] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
  );
  axios.defaults.withCredentials = true;
  //

  useEffect(() => {
    console.log("마운트됨");

    // console.log(document.cookie);
  }, []);

  //*인풋의 이미지가 변경될때 동시에 실행됨
  function changeImg(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("이미지 변환됨");
    if (e.target.files) {
      setCurrentFile(e.target.files[0]);
    }
  }

  //

  //* 인풋의 이미지가 변경된다음 실행됨
  useEffect(() => {
    if (currentFile) {
      const lexicalFileExtension = currentFile.name.split(".")[1];
      const changeImgURL = URL.createObjectURL(currentFile);

      setPreviewImg(changeImgURL);
      setFileExtension(lexicalFileExtension);
    }
  }, [currentFile]);

  //
  //* 게시글의 이름을 수정하면 동시에 실행됨
  function changePostName(e: React.ChangeEvent<HTMLInputElement>) {
    setPostName(e.target.value);
  }

  //

  //* 업로드 버튼을 누르면 동시에 작동됨
  async function submitForm(e: FormEvent) {
    e.preventDefault();

    if (currentFile) {
      const uniqueImageId = uuidv4();
      const newFileName = `${uniqueImageId}.${fileExtension}`;
      const userID = sessionStorage.getItem("userID");

      if (!userID) {
        alert("유저ID 검출할 수 없음");
        return;
      }

      //*                S3용 객체 생성
      const lexicalNewFile = new File([currentFile], newFileName, {
        type: currentFile.type,
      });

      //*                POST용 FromData 생성
      const formData = new FormData();
      formData.append("file", lexicalNewFile);
      formData.append("uploaderID", userID);
      formData.append("postID", uniqueImageId);
      formData.append("postName", postName);
      formData.append("imgExtension", fileExtension);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.get("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        console.log(response);
        alert(response.data);
      } catch (err) {
        console.error(err);
        alert("서버 에러발생");
      }
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
