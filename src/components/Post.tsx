import { styled } from "styled-components";
import { Spacing, Wrap } from "../styledComponent";
import { ReactComponent as VoteChaeck } from "../svg/vote-true.svg";
import { ReactComponent as VoteFalse } from "../svg/vote-false.svg";
import { PostData } from "../model/interfacePostData";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReactComponent as TrashCan } from "../svg/trashcan.svg";

interface postData {
  postData: PostData;
}
const Post: React.FC<postData> = ({ postData }) => {
  const userID = sessionStorage.getItem("userID");

  const [isCheckVote, setIsCheckVote] = useState<boolean>();
  const renderImgURL = `https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/${postData.id}.${postData.img_extension}`;

  useEffect(() => {
    checkVote();
  }, []);

  async function checkVote() {
    const postID = postData.id;
    console.log(`axios 호출하는 매게변수${postID} +  ${userID}`);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/vote?postID=${postID}&userID=${userID}`
      );
      console.log(response.data);
      if (response.data.length > 0) {
        console.log(postData.id + `투표됨`);
        setIsCheckVote(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function voteClick() {
    if (userID) {
      console.log(`ID = ${postData.id}투표 온클릭`);
      await voteAdd();
      checkVote(); // 투표가 성공적으로 추가된 후에 checkVote 함수 호출하여 최신 데이터로 상태 업데이트
    }
  }

  async function voteAdd() {
    const postID = postData.id;
    try {
      const response = await axios.post(`http://localhost:5000/api/vote`, {
        postID: postID,
        userID: userID,
      });
      if (response.status === 500) {
        alert("투표됨");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function voteDelete() {
    console.log(`투표취소${postData.id}`);
    try {
      const respnse = await axios.delete(
        `http://localhost:5000/api/vote/${postData.id}/${userID}}`
      );
      console.log(respnse);
    } catch (err) {
      alert(`투표 취소중 에러가 발생했습니다.`);
    }
  }

  function postDelete(postID: string) {
    console.log(`${postID} 삭제함`);
  }

  return (
    <Container>
      <Img src={renderImgURL} alt="" />
      <Formet>
        <Wrapdiv>
          <Spacing width="5px" />
          <div>
            {isCheckVote ? (
              <VoteChaeck
                onClick={voteDelete}
                style={{ fill: "green", height: "25px", width: "25px" }}
              />
            ) : (
              <VoteFalse
                onClick={voteClick}
                style={{ fill: "#bdbdbd", height: "25px", width: "25px" }}
              />
            )}
          </div>
          <Spacing width="5px" />
          <span>{`  : 0`}</span>
          <Spacing width="10px" />
          <span>{postData.post_name}</span>
          <Spacing width="20px" />
          <TrashCan
            onClick={() => postDelete(postData.id)}
            style={{ width: `25px`, float: "left", fill: "#870000" }}
          />
        </Wrapdiv>
      </Formet>
    </Container>
  );
};
export default Post;

const Container = styled.div`
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  /* opacity: 0; */

  /* :hover { */
  /* transform: scale(1.1, 1.1); */
  /* transition: transform.5s; */
  /* } */
`;

const Img = styled.img`
  object-fit: contain;
  width: 400px;
  border-radius: 10px;
`;

const Formet = styled.div`
  width: 100%;
  height: auto;
  background-color: #ececec;
  border-radius: 5px;
`;

const Wrapdiv = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  /* outline: auto; */
  /* border: 1px solid black; */
`;
