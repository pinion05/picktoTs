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
  const postID = postData.id;
  const userID = sessionStorage.getItem("userID");
  const [isCheckVote, setIsCheckVote] = useState<boolean>(false);
  const renderImgURL = `https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/${postData.id}.${postData.img_extension}`;

  useEffect(() => {
    checkVote();
  }, []);

  async function checkVote() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/vote?postID=${postID}&userID=${userID}`
      );
      if (response.data.length > 0) {
        await setIsCheckVote(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function clickVote() {
    if (userID) {
      console.log(`ID = ${postData.id}투표 온클릭`);
      await voteAdd();
      setIsCheckVote(!isCheckVote);
    }
  }

  async function voteAdd() {
    try {
      const response = await axios.post(`http://localhost:5000/api/vote`, {
        postID: postID,
        userID: userID,
      });
    } catch (err) {
      console.error(err);
      return;
    }
    alert("투표됨");
  }

  async function voteDelete() {
    console.log(`투표취소${postData.id}`);
    try {
      const respnse = await axios.delete(
        `http://localhost:5000/api/vote/${postData.id}/${userID}`
      );
      console.log(respnse);
    } catch (err) {
      alert(`투표 취소중 에러가 발생했습니다.`);
    }
  }

  async function postDelete() {
    await voteDelete();
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/post/${postID}/${postData.img_extension}`
      );
    } catch (err) {
      console.log(err);
    }
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
                style={{
                  cursor: "pointer",
                  fill: "green",
                  height: "25px",
                  width: "25px",
                }}
              />
            ) : (
              <VoteFalse
                onClick={clickVote}
                style={{
                  cursor: "pointer",
                  fill: "#bdbdbd",
                  height: "25px",
                  width: "25px",
                }}
              />
            )}
          </div>
          <Spacing width="5px" />
          <span>{`  : 0`}</span>
          <Spacing width="10px" />
          <span>{postData.post_name}</span>
          <Spacing width="20px" />
          {window.location.href === `http://localhost:3000/profile` ? (
            <TrashCan
              onClick={postDelete}
              style={{
                cursor: "pointer",
                width: `25px`,
                float: "left",
                fill: "#870000",
              }}
            />
          ) : (
            <></>
          )}
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
