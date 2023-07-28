import { styled } from "styled-components";

const Post = ({ data }: { data: string }) => {
  return (
    <Container>
      <Img src={data} />
    </Container>
  );
};
export default Post;

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin: 0;
`;

const Img = styled.img`
  margin: 10px;
  object-fit: contain;
  width: 400px;
`;
