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
    filterPosts();
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

  async function filterPosts() {
    if (allPost) {
      const filterdarray = await allPost.filter((post: PostData) =>
        filterOption(post)
      );
      setRenderPosts(filterdarray);
    }
  }

  //!   해당함수는 filter의 조건식으로 사용됨 (ele 를 받아 해당 ele의 값이 조건에 부합한지 boolean값으로 리턴한다)
  //?   만약 startDate와 endDate의 값이 없다면 작동하지 않는다
  //*   파라미터로 받은 PostData에서 날자를 추출해서 postDate 변수에 저장한다
  //*   startDate 값보다 크고 EndDate보다 업로드된날의 값이 작으면 true를 반환한다
  function filterOption(post: PostData): boolean {
    if (startDate && endDate) {
      const postDate: number = new Date(post.date).getDate();
      const postUploaderId: number = post.uploader_id;
      if (startDate.getDate() <= postDate && postDate <= endDate.getDate()) {
        if (sessionUserId && postUploaderId === parseInt(sessionUserId)) {
          return true;
        }
      }
    } else console.log("날짜를 선택해주세요.");
    return false;
  }

  function clickUpload(e: any) {
    navigate("/upload");
  }
  return (
    <>
      <Container>
        <Head>
          <ProfileImg imgsrc={profileImg} />
          <Wrap dir="clumn" style={{ justifyContent: "space-around" }}>
            <Wrap dir="row">
              <UserName>{`${userName}`}</UserName>
              <Button>프로필 수정</Button>
              <Button onClick={(e) => clickUpload(e)}>업로드</Button>
              <Button onClick={() => clickLogout()}>로그아웃</Button>
            </Wrap>
          </Wrap>
        </Head>
        <Wrap dir="row">
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
          <span>~~</span>
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
        <ArrayContainer column={3} imgArray={renderPosts} />
      </Container>
    </>
  );
};

export default Profile;

const Container = styled.div`
  width: auto;
  height: auto;
  margin-top: 50px;
  border-radius: 20px;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  /* outline: black 1px solid; */
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); */
  /* outline: 1px solid black; */
`;

const Head = styled.div`
  width: 500px;
  height: 100px;
  align-items: center;
  display: flex;
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

const UserName = styled.p`
  margin: 0;
  margin-right: 10px;
`;
// 무노흐 ㅣ성
