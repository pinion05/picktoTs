import React, { FormEvent, useRef, useState } from "react";
import { styled } from "styled-components";
import { onFileUpload, readObject } from "../awsS3";
import { Button } from "@mui/material";

const Upload: React.FC = () => {
  const [newImg, setNewImg] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");
  //

  function submitForm(e: FormEvent) {
    e.preventDefault();

    //*이미지가 선택되었나 확인
    if (imgRef.current !== null && imgRef.current.files) {
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
        onFileUpload(newFile);
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
        <input
          type="text"
          value={newFileName}
          onChange={(e) => changePostName(e)}
        />
        <Button type="submit">업로드</Button>
      </form>
      <button onClick={() => clickSerch()} />
    </>
  );
};
export default Upload;

const ImgUpload = styled.input`
  width: 200px;
  height: 30px;
  margin: 1px;
`;
