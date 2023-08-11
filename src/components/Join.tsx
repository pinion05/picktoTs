import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { css as stCss } from "styled-components";
import { Button } from "@mui/material";
import { css } from "@emotion/react";

const Join = () => {
  //
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //

  function inputOnChange(e: any, k: string) {
    if (k === `email`) setEmail(e.target.value);
    if (k === `pw`) setPassword(e.target.value);
  }

  function changeNikcname(e: React.ChangeEvent<HTMLInputElement>) {
    setNickName(e.target.value);
  }

  function hadleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("서밋");
  }

  function isValidEmail(email: string) {
    const regex = /^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  return (
    <>
      <i className="fi fi-rr-eye"></i>
      <Button />
      <Container onSubmit={(e) => hadleSubmit(e)}>
        <p className="marginbot">회원가입</p>
        <Text>닉네임</Text>
        <Input type="text" placeholder="닉네임" />
        <Text>이메일</Text>
        <Input
          value={email}
          placeholder="이메일"
          onChange={(e) => inputOnChange(e, `email`)}
        />
        <Text>비밀번호</Text>
        <Input
          value={password}
          type="password"
          placeholder="비밀번호"
          onChange={(e) => inputOnChange(e, `pw`)}
        />
        <JoinButton type="submit">회원가입</JoinButton>
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

const Input = styled.input`
  height: 25px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const JoinButton = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #ffffff;
`;
