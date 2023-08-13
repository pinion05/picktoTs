import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { css as stCss } from "styled-components";
import { Button, Input } from "@mui/material";
import { css } from "@emotion/react";
import { green } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { Spacing, Wrap } from "../styledComponent";

const Join = () => {
  //
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  //
  const { loginConditon, logout, login } = useStore();

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
      alert("자동으로 로그인됩니다");
      login();
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }
  function changeInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    k: string
  ) {
    if (k === `nick`) setNickname(e.target.value);
    if (k === `email`) setEmail(e.target.value);
    if (k === `pw`) setPassword(e.target.value);
    if (k === `pwc`) changePasswordCheck(e);
  }

  function changePasswordCheck( //*비밀번호 무결성 검사
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
      <Spacing height="100px" />
      <Container onSubmit={(e) => hadleSubmit(e)}>
        <p className="marginbot">회원가입</p>

        <span>닉네임</span>

        <Input
          type="text"
          placeholder="닉네임을 입력하세요"
          onChange={(e) => changeInput(e, "nick")}
        />
        <Spacing height="10px"></Spacing>
        <span>이메일</span>
        <Input
          value={email}
          placeholder="abcd@gmail.com"
          onChange={(e) => changeInput(e, `email`)}
        />
        <p>비밀번호 </p>
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
        <Spacing height="25px" />
        <Button type="submit">회원가입</Button>
      </Container>
    </>
  );
};
export default Join;

const Container = styled.form`
  width: 400px;
  height: auto;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  flex-flow: column;
  display: flex;
  padding: 20px;
`;

const JoinButton = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: #ffffff;
`;
