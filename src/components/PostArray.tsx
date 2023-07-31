import React from "react";
import Post from "./Post";
import { styled } from "styled-components";

const PostArray = ({ data }: { data: string[] }) => {
  // const array: any[] = props.data;
  return (
    <>
      <Contianer>
        {data.map((img: string) => (
          <Post data={img} />
        ))}
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
