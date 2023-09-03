import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import profileImg from "../img/facebookProfile.png";
import ArrayContainer from "./ArrayContainer";
import { Spacing, Wrap } from "../styledComponent";
import { Button } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import { PostData } from "../model/interfacePostData";
import moment from "moment";

const Profile: React.FC = () => {
  const { loginConditon, logout, login, setUserName, userName } = useStore();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [allPost, setAllPost] = useState<PostData[]>();
  const [renderPosts, setRenderPosts] = useState<PostData[]>();
  const sessionUserId: string | null = sessionStorage.getItem("userID");

  const navigate = useNavigate();

  //* state에  전체 게시글들 array를 저장
  useEffect(() => {
    getAllPost();
    setUserName(sessionStorage.userName);
  }, []);

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
  }, [allPost]);

  useEffect(() => {
    console.log();
    changeDate();
  }, [startDate, endDate]);

  //* 로그인상태 state를 false로 수정
  function clickLogout() {
    logout();
    sessionStorage.clear();
  }

  //* allPost state애 값을 저장
  async function getAllPost() {
    try {
      const allPosts = await axios.get("http://localhost:5000/api/post");
      console.log("state에 저장되는 값--------------");
      console.log(allPosts.data);
      console.log("state에 저장되는 값--------------");
      setAllPost(allPosts.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function changeDate() {
    if (allPost) {
      const realStartDate = moment(startDate).startOf("day");
      const realEndtDate = moment(endDate).endOf("day");
      const filterdarray = await allPost.filter((post: PostData) => {
        const postUploaderId: number = post.uploader_id;

        const postDate = moment(post.date);
        if (postDate.isBetween(realStartDate, realEndtDate)) {
          if (sessionUserId && postUploaderId === parseInt(sessionUserId)) {
            return true;
          }
        }
      });
      setRenderPosts(filterdarray);
    }
  }

  function clickUpload(e: any) {
    navigate("/upload");
  }
  return (
    <>
      <Spacing height="100px" />
      <Container>
        <Head>
          <Wrap dir="clumn">
            <span>{`${userName}`}</span>
            <Spacing height="50px" />
            <Wrap dir="row">
              {/* <ProfileImg imgsrc={profileImg} /> */}
              {/* <Button>프로필 수정</Button> */}
              <Button onClick={(e) => clickUpload(e)}>업로드</Button>
              <Button onClick={() => clickLogout()}>로그아웃</Button>
            </Wrap>
          </Wrap>
        </Head>
        <Wrap style={{ alignItems: "center" }} dir="row">
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <Spacing width="20px" />
          <span style={{ fontSize: "100px" }}>~</span>
          <Spacing width="20px" />
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Wrap>
        <Spacing height="50px" />
        <ArrayContainer postDataArray={renderPosts} />
      </Container>
    </>
  );
};

export default Profile;

const Container = styled.div`
  width: auto;
  height: auto;
  border-radius: 20px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  /* outline: black 1px solid; */
`;

const Head = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0px 0px;
  /* outline: 1px solid black; */
`;
const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;

const ProfileImg = styled.div<{ imgsrc: string }>`
  height: 80px;
  width: 80px;
  margin: 10px;
  border-radius: 50px;
  background-color: yellow;
  background-repeat: no-repeat;
  background-size: contain;
  /* background-image: url(${(props) => props.imgsrc}); */
`;

const UserName = styled.span`
  margin: 0px;
`;
// 무노흐 ㅣ성
