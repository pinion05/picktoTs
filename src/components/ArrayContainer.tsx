import PostArray from "./PostArray";
import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";
import { styled } from "styled-components";

interface ArrayContainerProps {
  column: number;
  imgArray: string[];
}
const ArrayContainer: React.FC<ArrayContainerProps> = ({
  column,
  imgArray,
}) => {
  //
  function shuffle(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
  }
  // const imgArray = [img1, img2, img3, img4];

  function lngthTimeImgArray(a: number): Array<any> {
    let beforMixImgArray: any = [];
    for (let i = 0; i < a; i++) {
      beforMixImgArray = beforMixImgArray.concat(imgArray);
    }
    return shuffle(beforMixImgArray);
  }

  const array1: string[] = [];
  const array2: string[] = [];
  const array3: string[] = [];

  lngthTimeImgArray(1).forEach((image, index) => {
    if (index % 3 === 0) {
      array3.push(image);
    } else if (index % 3 === 1) {
      array2.push(image);
    } else {
      array1.push(image);
    }
  });

  return (
    <>
      <Container>
        {[array1, array2, array3].map((array) => (
          <PostArray data={array} />
        ))}
      </Container>
    </>
  );
};

export default ArrayContainer;

const Container = styled.div`
  /* background-color: yellow; */
  display: flex;
  /* outline: 1px solid red; */
  flex-flow: row nowrap;
`;
