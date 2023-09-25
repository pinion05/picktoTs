import { styled } from "styled-components";
import { PostData } from "../model/interfacePostData";
import PostArray from "./PostArray";
import { Spacing } from "../styledComponent";
import { ShowAble } from "../model/ShowAble";

interface ArrayContainerProps {
  postDataArray: Array<PostData> | undefined;
}

const ArrayContainer = ({
  postDataArray,
}: ArrayContainerProps): JSX.Element => {
  let postDataArray1: any[] = [];
  let postDataArray2: any[] = [];
  let postDataArray3: any[] = [];

  function windowWidth(): number {
    if (window.innerWidth > 1000) return 3;
    if (window.innerWidth <= 1000 && window.innerWidth > 400) return 2;
    if (window.innerWidth <= 400) return 1;
    return 3;
  }

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
            <>
              <PostArray postDataArray={postDataArray} />
              <Spacing width="15px" />
            </>
          )
        )}
      </Container>
    </>
  );
};

export default ArrayContainer;

const Notification = styled.h1<ShowAble>`
  display: ${(props) => (props.showAble ? "block" : "none")};
`;

const Container = styled.div`
  display: flex;
  /* outline: 1px solid red; */
  flex-flow: row nowrap;
`;
