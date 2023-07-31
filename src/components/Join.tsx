import { useState } from "react";
import { styled } from "styled-components";
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { app } from "../fbase";

const Join = () => {
  app();
  const auth = getAuth();
  //
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //

  function onChangeHandle(e: any, k: string) {
    if (k === `email`) setEmail(e.target.value);
    if (k === `pw`) setPassword(e.target.value);
  }

  function joinButtonClickHandle() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("회원가입되었습니다. 자동으로 로그인됩니다");
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <>
      <Container>
        <p>회원가입</p>
        <p>이메일</p>
        <EmailInput
          value={email}
          placeholder="이메일"
          onChange={(e) => onChangeHandle(e, `email`)}
        />

        <p>비밀번호</p>
        <PWinput
          value={password}
          type="text"
          placeholder="비밀번호"
          onChange={(e) => onChangeHandle(e, `pw`)}
        />
        <JoinButton onClick={() => joinButtonClickHandle()}>
          회원가입
        </JoinButton>
      </Container>
    </>
  );
};
export default Join;
const Container = styled.div`
  width: 400px;
  height: auto;
  background-color: #ffffff;
  margin-top: 100px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  flex-flow: column;
  display: flex;
  padding: 20px;
`;

const IDinput = styled.input`
  height: 25px;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 5px;
`;
const EmailInput = styled.input`
  height: 25px;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 5px;
`;
const PWinput = styled.input`
  height: 25px;
  margin-bottom: 30px;
  padding: 5px;
  border-radius: 5px;
`;
const JoinButton = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
`;
