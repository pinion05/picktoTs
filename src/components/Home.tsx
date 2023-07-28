import React from "react";
import { styled } from "styled-components";
import PostArray from "./PostArray";
import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";

console.log(typeof img1);

const Home: React.FC = () => {
  //
  function shuffle(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
  }
  //
  const imgArray = [img1, img2, img3, img4];
  //
  //
  function lngth100ImgArray(): Array<any>[] {
    let beforMixImgArray: any = [];
    for (let i = 0; i < 100; i++) {
      beforMixImgArray = beforMixImgArray.concat(imgArray);
    }
    return shuffle(beforMixImgArray);
  }

  const arrayA: any[] = lngth100ImgArray();

  const array1: string[] = [];
  const array2: string[] = [];
  const array3: string[] = [];

  arrayA.forEach((image, index) => {
    if (index % 3 === 0) {
      array1.push(image);
    } else if (index % 3 === 1) {
      array2.push(image);
    } else {
      array3.push(image);
    }
  });

  console.log(array1); // 첫 번째 집합에 들어간 이미지 배열
  console.log(array2); // 두 번째 집합에 들어간 이미지 배열
  console.log(array3); // 세 번째 집합에 들어간 이미지 배열

  return (
    <>
      <WebTitle>PICKTO</WebTitle>
      <ArrayContainer>
        <PostArray data={array1} />
        <PostArray data={array2} />
        <PostArray data={array3} />
      </ArrayContainer>
    </>
  );
};
export default Home;

const ArrayContainer = styled.div`
  width: auto;
  height: 30000px;
  background-color: yellow;
  display: flex;
`;

const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;
