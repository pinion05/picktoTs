import React from "react";
import { styled } from "styled-components";
import { onFileUpload } from "../awsS3";

const Upload: React.FC = () => {
  return (
    <>
      <>
        <ImgUpload type="file" onChange={onFileUpload} />
      </>
    </>
  );
};
export default Upload;

const ImgUpload = styled.input`
  width: 1000px;
  height: 30px;
  margin: 1px;
`;
