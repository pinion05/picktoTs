import { styled } from "styled-components";
import { PostData } from "../model/interfacePostData";
import PostArray from "./PostArray";

interface ArrayContainerProps {
  column: number;
  postDataArray: Array<PostData> | undefined;
}

const ArrayContainer: React.FC<ArrayContainerProps> = ({
  column,
  postDataArray,
}) => {
  let postDataArray1: any[] = [];
  let postDataArray2: any[] = [];
  let postDataArray3: any[] = [];

  if (postDataArray) {
    postDataArray.forEach((postData, index) => {
      if (index % 3 === 0) {
        postDataArray3.push(postData);
      } else if (index % 3 === 1) {
        postDataArray2.push(postData);
      } else {
        postDataArray1.push(postData);
      }
    });
  }

  return (
    <>
      <Container>
        {[postDataArray1, postDataArray2, postDataArray3].map(
          (postDataArray) => (
            <PostArray postDataArray={postDataArray} />
          )
        )}
      </Container>
    </>
  );
};

export default ArrayContainer;

const Container = styled.div`
  display: flex;
  /* outline: 1px solid red; */
  flex-flow: row nowrap;
`;
