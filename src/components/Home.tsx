import React from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
// import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
// import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
// import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
// import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";

const Home: React.FC = () => {
  //
  function shuffle(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
  }
  const img1 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/0e39e762-ac1a-4f2f-84ee-0dc0a4e5788f.png";

  const img2 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/2f221cd0-2f02-4c66-bf59-1457cb6494e1.png";

  const img3 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/2f221cd0-2f02-4c66-bf59-1457cb6494e1.png";

  const img4 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/2f221cd0-2f02-4c66-bf59-1457cb6494e1.png";

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
      <ArrayContainer column={3} imgArray={imgArray} />
    </>
  );
};
export default Home;

const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;
