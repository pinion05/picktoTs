import { styled } from "styled-components";

const Post = ({ data }: { data: string }) => {
  const img: string = data;
  return (
    <Container>
      <Img src={img}></Img>
    </Container>
  );
};
export default Post;

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin: 0;
  :hover {
    transform: scale(1.1, 1.1);
    transition: transform.5s;
    box-shadow: inset 5em 1em gold;
  }
`;

const Img = styled.img`
  margin: 10px;
  object-fit: contain;
  width: 400px;
`;
