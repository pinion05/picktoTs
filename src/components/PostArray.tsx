import React from "react";
import Post from "./Post";
import { styled } from "styled-components";
import { Spacing } from "../styledComponent";
import { PostData } from "../model/interfacePostData";

interface ArrayContainerProps {
  postDataArray: Array<PostData> | undefined;
}

const PostArray: React.FC<ArrayContainerProps> = ({ postDataArray }) => {
  return (
    <>
      <Spacing width="20px" />
      <Contianer>
        {postDataArray
          ? postDataArray.map((postData: PostData) => (
              <Post postData={postData} />
            ))
          : null}
      </Contianer>
    </>
  );
};

export default PostArray;

const Contianer = styled.div`
  display: flex;
  /* outline: solid 1px gray; */
  flex-flow: column;
`;
