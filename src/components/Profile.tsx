import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";
import profileImg from "../img/facebookProfile.png";
const Profile: React.FC = () => {
  // const navigate = useNavigate();
  // const { loginde, login, logout } = useStore();

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
      </Container>
    </>
  );
};

export default Profile;

const Container = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  outline: 1px solid black;
`;

const Head = styled.div`
  width: 100%;
  height: 100px;
  outline: 1px solid black;
  align-items: center;
  display: flex;
  border-radius: 20px 20px 0px 0px;
`;

const ProfileImg = styled.div<{ imgsrc: string }>`
  height: 80px;
  width: 80px;
  margin: 10px;
  border-radius: 50px;
  /* background-image: url(${(props) => props.imgsrc}); */
  background-color: yellow;
  background-repeat: no-repeat;
  background-size: contain;
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
