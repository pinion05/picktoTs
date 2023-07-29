import React from "react";
import { styled } from "styled-components";

const Upload: React.FC = () => {
  return (
    <>
      <>
        <ImgUpload type="file" />
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
