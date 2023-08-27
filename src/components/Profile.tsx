import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import React, { useEffect } from "react";
import { styled } from "styled-components";
import profileImg from "../img/facebookProfile.png";
import ArrayContainer from "./ArrayContainer";
import { Wrap } from "../styledComponent";
import { Button } from "@mui/material";

const Profile: React.FC = () => {
  const { loginConditon, logout, login, setUserName, userName } = useStore();

  const navigate = useNavigate();

  function clickLogout() {
    logout();
    sessionStorage.clear();
  }

  useEffect(() => {
    setUserName(sessionStorage.userName);
  }, []);

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
            <Wrap dir="row">{/* <UserName>{`username`}</UserName> */}</Wrap>
            <Wrap dir="row">{/* <UserName>{`username`}</UserName> */}</Wrap>
          </Wrap>
        </Head>
        {/* <ArrayContainer column={3} imgArray={array1} /> */}
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
