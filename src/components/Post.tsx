import { styled } from "styled-components";
import { Spacing, Wrap } from "../styledComponent";
import { ReactComponent as VoteChaeck } from "../svg/vote-true.svg";
import { ReactComponent as VoteFalse } from "../svg/vote-false.svg";
import { PostData } from "../model/interfacePostData";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as TrashCan } from "../svg/trashcan.svg";
import { ShowAble } from "../model/ShowAble";
import { Button } from "@mui/material";
import { Cookies } from "react-cookie";
import { refreshToken } from "./Login";

interface postData {
  postData: PostData;
}
const Post: React.FC<postData> = ({ postData }) => {
  const postID = postData.id;
  const userID = sessionStorage.getItem("userID");
  const [isCheckVote, setIsCheckVote] = useState<boolean>(false);
  const renderImgURL = `https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/${postData.id}.${postData.img_extension}`;
  const [showAble, setShowAble] = useState<boolean>(true);
  const modalRef = useRef<HTMLDialogElement>(null);
  const cookies = new Cookies();

  axios.defaults.withCredentials = true;

  function showModal() {
    console.log(`모달실행`);
    modalRef.current?.showModal();
  }

  function closeModal() {
    modalRef.current?.close();
  }

  useEffect(() => {
    checkVote();
  });

  async function checkVote() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/vote?postID=${postID}&userID=${userID}`,
        { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } }
      );
      if (response.data.length > 0) {
        await setIsCheckVote(true);
      }
    } catch (err) {
      refreshToken();
      checkVote();
      console.log(err);
    }
  }

  async function voteAdd() {
    if (userID) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/vote`,
          {
            postID: postID,
            userID: userID,
          },
          { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } }
        );
        await setIsCheckVote(!isCheckVote);
      } catch (err) {
        try {
          refreshToken();
        } catch (error) {
          console.log(`토큰 재발급 실패`);
        }
        console.error(err);
        return;
      }
    }
  }

  async function voteDelete() {
    console.log(`투표취소${postData.id}`);
    try {
      const respnse = await axios.delete(
        `http://localhost:5000/api/vote/${postData.id}/${userID}`,
        { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } }
      );
      console.log(respnse);
      setIsCheckVote(!isCheckVote);
    } catch (err) {
      alert(`투표 취소중 에러가 발생했습니다.`);
      try {
        await refreshToken();
      } catch (error) {
        console.log(`토큰 재발급실패`);
      }
    }
  }

  async function postDelete() {
    try {
      await voteDelete();
      const response = await axios.delete(
        `http://localhost:5000/api/post/${postID}/${postData.img_extension}`,
        { headers: { Authorization: "Bearer" + cookies.get("accessToken") } }
      );
    } catch (err) {
      console.log(err);
      return;
    }
    setShowAble(false);
    console.log(`${postID} 삭제함`);
    alert("게시글 삭제됨");
  }

  return (
    <Container showAble={showAble}>
      <dialog
        style={{
          border: "0px",
          borderRadius: `10px`,
          boxShadow: `0px 0px 10px 0px gray`,
        }}
        ref={modalRef}
      >
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            height: `100%`,
            width: `100%`,
          }}
        >
          <div>
            <Spacing width="5px" />
          </div>
          <img style={{ height: "40vw" }} src={renderImgURL} alt="" />
          <VoteChaeck
            onClick={voteDelete}
            style={{
              cursor: "pointer",
              fill: "green",
              height: "25px",
              width: "25px",
              display: `${isCheckVote === true ? `block` : `none`}`,
            }}
          />
          <VoteFalse
            onClick={voteAdd}
            style={{
              cursor: "pointer",
              fill: "#bdbdbd",
              height: "25px",
              width: "25px",
              display: `${isCheckVote === false ? `block` : `none`}`,
            }}
          />
          <button onClick={closeModal}>X</button>
        </div>
      </dialog>
      <Img onClick={showModal} src={renderImgURL} alt="" />
      <Formet>
        <Wrapdiv style={{ display: `flex`, justifyContent: `space-between` }}>
          <div>
            <Spacing width="5px" />
            <VoteChaeck
              onClick={voteDelete}
              style={{
                cursor: "pointer",
                fill: "green",
                height: "25px",
                width: "25px",
                display: `${isCheckVote === true ? `block` : `none`}`,
              }}
            />
            <VoteFalse
              onClick={voteAdd}
              style={{
                cursor: "pointer",
                fill: "#bdbdbd",
                height: "25px",
                width: "25px",
                display: `${isCheckVote === false ? `block` : `none`}`,
              }}
            />
          </div>

          <span>{postData.post_name}</span>
          {window.location.href === `http://localhost:3000/profile` ? (
            <TrashCan
              onClick={postDelete}
              style={{
                cursor: "pointer",
                width: `25px`,
                float: "left",
                fill: "#870000",
                justifySelf: "end",
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

const Container = styled.div<ShowAble>`
  display: ${(props) => (props.showAble === true ? `box` : `none`)};
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
  display: flex;
  flex-flow: row nowrap;
  /* outline: auto; */
  /* border: 1px solid black; */
`;
