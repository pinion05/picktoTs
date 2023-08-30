import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";
import { styled } from "styled-components";
import { PostData } from "../model/interfacePostData";
import PostArray from "./PostArray";

interface ArrayContainerProps {
  column: number;
  imgArray: Array<PostData> | undefined;
}
const ArrayContainer: React.FC<ArrayContainerProps> = ({
  column,
  imgArray,
}) => {
  //

  // const imgArray = [img1, img2, img3, img4];

  function asdf() {
    if (imgArray === undefined) return [];
    let result = [];
    for (let i = 0; i < imgArray.length; i++) {
      result.push(
        `https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/${imgArray[i].id}.${imgArray[i].img_extension}`
      );
    }
    return result;
  }

  const array1: string[] = [];
  const array2: string[] = [];
  const array3: string[] = [];

  asdf().forEach((image, index) => {
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
