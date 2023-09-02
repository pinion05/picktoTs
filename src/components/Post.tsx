import { styled } from "styled-components";
import { Spacing } from "../styledComponent";
import { ReactComponent as VoteChaeck } from "../svg/vote-true.svg";
import { ReactComponent as VoteFalse } from "../svg/vote-false.svg";
import { PostData } from "../model/interfacePostData";

interface postData {
  postData: PostData;
}
const Post: React.FC<postData> = ({ postData }) => {
  const renderImgURL = `https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/${postData.id}.${postData.img_extension}`;

  return (
    <Container>
      <img src={renderImgURL} alt="" />
      <Formet>
        <VoteChaeck style={{ fill: "green", height: "25px", width: "25px" }} />
        <VoteFalse style={{ fill: "#bdbdbd", height: "25px", width: "25px" }} />
        <span>{postData.post_name}</span>
      </Formet>
    </Container>
  );
};
export default Post;

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  :hover {
    transform: scale(1.1, 1.1);
    transition: transform.5s;
    box-shadow: inset 5em 1em gold;
  }
`;

const Img = styled.img`
  object-fit: contain;
  width: 400px;
`;

const Formet = styled.div`
  width: 100%;
  height: auto;
  background-color: #ececec;
`;
