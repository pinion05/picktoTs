import React from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";

const Home: React.FC = () => {
  //
  function shuffle(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
  }

  const imgArray = [img1, img2, img3, img4];

  function lngth100ImgArray(): Array<string> {
    let beforMixImgArray: any[] = [];
    for (let i = 0; i < 100; i++) {
      beforMixImgArray = beforMixImgArray.concat(imgArray);
    }
    return shuffle(beforMixImgArray);
  }
  return (
    <>
      <WebTitle>PICKTO</WebTitle>
      <ArrayContainer column={3} imgArray={lngth100ImgArray()} />
    </>
  );
};
export default Home;

const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;
