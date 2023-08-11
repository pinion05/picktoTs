import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { css as stCss } from "styled-components";
import { Button, Input } from "@mui/material";
import { css } from "@emotion/react";
import { green } from "@mui/material/colors";
import axios from "axios";

const Join = () => {
  //
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  //

  function isValidEmail(email: string) {
    const regex = /^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  function hadleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postRequest();
  }

  async function postRequest() {
    try {
      const data = {
        nickname: nickname,
        email: email,
        password: password,
      };
      const resqonse = await axios.post(
        "http://localhost:5000/api/register",
        data
      );
      console.log(resqonse.data);
    } catch (err) {
      console.log(err);
    }
  }

  function changeInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    k: string
  ) {
    if (k === `nick`) setPasswordCheck(e.target.value);
    if (k === `email`) setEmail(e.target.value);
    if (k === `pw`) setPassword(e.target.value);
    if (k === `pwc`) changePasswordCheck(e);
  }

  function changePasswordCheck(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPasswordCheck(e.target.value);
    if (password === e.target.value) {
      e.target.style.color = "#81c784";
    } else {
      e.target.style.color = "red";
    }
  }

  return (
    <>
      <Container onSubmit={(e) => hadleSubmit(e)}>
        <p className="marginbot">회원가입</p>
        <Text>닉네임</Text>
        <Input
          type="text"
          placeholder="닉네임을 입력하세요"
          onChange={(e) => changeInput(e, "nick")}
        />
        <Text>이메일</Text>
        <Input
          value={email}
          placeholder="abcd@gmail.com"
          onChange={(e) => changeInput(e, `email`)}
        />
        <Text>비밀번호 </Text>
        <Input
          value={password}
          type="text"
          placeholder="비밀번호"
          onChange={(e) => changeInput(e, `pw`)}
          style={{ marginBottom: "5px" }}
        />
        <Input
          onChange={(e) => changeInput(e, "pwc")}
          style={{ marginBottom: "5px" }}
          placeholder="비밀번호 확인"
          type="password"
        />
        <Button type="submit">회원가입</Button>
      </Container>
    </>
  );
};
export default Join;

const marginbot = stCss`
  margin-bottom: 5px;
`;

const Text = styled.p`
  ${marginbot}
`;

const Container = styled.form`
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

// const Input = styled.input`
//   height: 25px;
//   margin-bottom: 10px;
//   padding: 5px;
//   border-radius: 5px;
// `;

const JoinButton = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #ffffff;
`;
