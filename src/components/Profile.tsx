import img1 from "../img/8machine-_-mTnn1HYD_KU-unsplash.jpg";
import img2 from "../img/abik-peravan-doW8Spg4Zy8-unsplash.jpg";
import img3 from "../img/cash-macanaya-u24e_r6BsRE-unsplash.jpg";
import img4 from "../img/david-emrich-X1Hozg__MiA-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import profileImg from "../img/facebookProfile.png";
import ArrayContainer from "./ArrayContainer";
const Profile: React.FC = () => {
  // const navigate = useNavigate();
  // const { loginde, login, logout } = useStore();
  const array1: string[] = [
    img1,
    img2,
    img4,
    img3,
    img2,
    img4,
    img3,
    img2,
    img4,
    img3,
  ];
  return (
    <>
      <Container>
        <Head>
          <ProfileImg imgsrc={profileImg} />
          <WrapColumn style={{ justifyContent: "space-around" }}>
            <WrapRow>
              <UserName>{`username`}</UserName>
              <Button>프로필 수정</Button>
            </WrapRow>
            <WrapRow>
              <UserName>{`username`}</UserName>
            </WrapRow>
            <WrapRow>
              <UserName>{`username`}</UserName>
            </WrapRow>
          </WrapColumn>
        </Head>
        <ArrayContainer column={3} imgArray={array1} />
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

const WrapRow = styled.div`
  display: flex;
  flex-flow: row;
`;

const WrapColumn = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Button = styled.button`
  background-color: #b2c7ff;
  outline: none;
  border: none;
  height: auto;
  border-radius: 8px;
`;
