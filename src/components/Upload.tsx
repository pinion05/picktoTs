import React from "react";
import { styled } from "styled-components";
import { onFileUpload } from "../awsS3";
import { Button } from "@mui/material";

const Upload: React.FC = () => {
  async function changeFile(params: any) {}
  submitForm(e : FormDataEvent<SubmitEvent>){}

  return (
    <>
      <form onSubmit={e=>submitForm(e)}>
        <ImgUpload type="file" onChange={(e) => onFileUpload(e)} />
        <Button>업로드</Button>
      </form>
    </>
  );
};
export default Upload;

const ImgUpload = styled.input`
  width: 100px;
  height: 30px;
  margin: 1px;
`;
