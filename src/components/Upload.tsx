import React, { FormEvent, useRef } from "react";
import { styled } from "styled-components";
import { onFileUpload } from "../awsS3";
import { Button } from "@mui/material";

const Upload: React.FC = () => {
  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (imgRef.current !== null && imgRef.current.files) {
      const oldFile = imgRef.current.files[0];
      const fileExtension = oldFile.name.split(".")[1];
      let newFile: File | null = null;
      switch (fileExtension) {
        case "jpg": //jpg일 경우
          newFile = new File([oldFile], `변경이름.jpg`, {
            type: oldFile.type,
          }); // File생성자를 이용해서 oldFile의 이름을 바꿔준다
          // setImgs((prev) => [...prev, newFile]); // 저장
          break;
        case "png":
          newFile = new File([oldFile], `변경이름.png`, {
            type: oldFile.type,
          });
          // setImgs((prev) => [...prev, newFile]);
          break;
        default:
          alert("지원하지 않는 파일 형식입니다.");
          break;
      }
      console.log(newFile?.name);
    }
  }
  const imgRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form onSubmit={(e) => submitForm(e)}>
        <ImgUpload ref={imgRef} type="file" />
        <Button type="submit">업로드</Button>
      </form>
    </>
  );
};
export default Upload;

const ImgUpload = styled.input`
  width: 200px;
  height: 30px;
  margin: 1px;
`;
