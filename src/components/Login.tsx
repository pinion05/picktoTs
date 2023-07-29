import { styled } from "styled-components";
import { useStore } from "../store";
import apple from "../img/apple.png";
import facebook from "../img/facebook.png";
import github from "../img/github.png";
import google from "../img/google.png";
import guest from "../img/guest.png";

const Login = () => {
  const { loginde, login, logout } = useStore();

  interface LoginIcon {
    name: string;
    src: string;
  }

  const logoImgs: LoginIcon[] = [
    { name: "google", src: google },
    { name: "facebook", src: facebook },
    { name: "github", src: github },
    { name: "apple", src: apple },
    { name: "guest", src: guest },
  ];
  return (
    <>
      <Container>
        <Title>로그인 또는 회원가입</Title>
        <IDinput placeholder="아이디" />
        <PWinput placeholder="비밀번호" />
        <div style={{ display: `flex` }}>
          <input type="checkbox" style={{ marginRight: `5px` }} />
          <p>로그인상태유지</p>
        </div>
        <LoginButton>로그인</LoginButton>
        <Other>
          <Join>회원가입</Join>
          <FindPW>비밀번호찾기</FindPW>
        </Other>
        {logoImgs.map((obj, idx) => (
          <ProviderButton key={idx}>
            <LogoImg src={obj.src} />
            <Logintxt>Continue with {obj.name} </Logintxt>
          </ProviderButton>
        ))}
      </Container>
    </>
  );
};
export default Login;

const Container = styled.div`
  width: 400px;
  height: 600px;
  background-color: #ffffff;
  margin-top: 100px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  flex-flow: column;
  display: flex;
  padding: 20px;
`;

const Title = styled.p`
  margin-bottom: 20px;
`;
const IDinput = styled.input`
  height: 25px;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 5px;
`;
const PWinput = styled.input`
  height: 25px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
`;
const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;
const Join = styled.p`
  margin: 0;
`;

const FindPW = styled.p`
  margin: 0;
`;

const Other = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-flow: nowrap;
  justify-content: space-around;
  margin-bottom: 20px;
`;
const LogoImg = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;
const Logintxt = styled.p`
  margin-left: 100px;
`;

const ProviderButton = styled.button`
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px;
`;