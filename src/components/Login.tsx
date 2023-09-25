import { styled } from "styled-components";
import { useStore } from "../store";
import apple from "../img/apple.png";
import facebook from "../img/facebook.png";
import github from "../img/github.png";
import google from "../img/google.png";
import guest from "../img/guest.png";
import { useNavigate } from "react-router-dom";
import { ProviderIcon } from "../model/ProviderIcon";
import ProviderButton from "./ProviderButton";
import { Button, Input } from "@mui/material";
import { log } from "console";
import { Spacing } from "../styledComponent";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

export async function refreshToken() {
  try {
    console.log(`토큰 재발급 시도`);
    const response = await axios.get(`http://localhost:5000/refreshtoken`, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { loginConditon, logout, login } = useStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const logoImgs: ProviderIcon[] = [
    { name: "google", src: google },
    { name: "facebook", src: facebook },
    { name: "github", src: github },
    { name: "apple", src: apple },
    { name: "guest", src: guest },
  ];
  axios.defaults.withCredentials = true;
  function joinClick() {
    navigate("/join");
  }
  function isValidEmail(email: string) {
    const regex = /^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  async function clickLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log("이메일,비밀번호 일치");
      const userInfo = response.data;
      sessionStorage.clear();
      sessionStorage.setItem("userName", userInfo.nickname);
      sessionStorage.setItem("userID", userInfo.id);
      sessionStorage.setItem("userEmail", userInfo.email);
      login();
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("에러발생");
    }
  }

  //
  async function accessToken() {
    try {
      console.log("토큰검증시도");
      const response = await axios.get(`http://localhost:5000/accesstoken`, {
        withCredentials: true,
      });
      console.log(response);
    } catch (err) {}
  }

  async function emailPasswordRequset() {}

  function changeId(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEmail(e.target.value);
  }

  function changePassword(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Spacing height="100px" />
      <Button onClick={() => refreshToken()}>토큰 재발급하기</Button>
      <Button onClick={() => accessToken()}>토큰 검증하기</Button>
      <Spacing height="10px" />

      <Container>
        <span>로그인</span>
        <Spacing height="15px" />
        <Input
          placeholder="이메일"
          value={email}
          onChange={(e) => changeId(e)}
        />
        <Spacing height="15px" />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => changePassword(e)}
        />
        <div style={{ display: `flex` }}>
          <input type="checkbox" />
          <Spacing width="10px" />
          <p>로그인상태유지</p>
        </div>
        <Button onClick={(e) => clickLogin()}>로그인</Button>
        <Spacing height="10px" />
        <Other>
          <Join onClick={joinClick}>회원가입</Join>
          <FindPW>비밀번호찾기</FindPW>
        </Other>
        {logoImgs.map((obj, idx) => (
          <>
            <Spacing height="10px" />
            <ProviderButton src={obj.src} name={obj.name} />
          </>
        ))}
      </Container>
    </>
  );
};
export default Login;

const Container = styled.div`
  width: 400px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  flex-flow: column;
  display: flex;
  padding: 20px;
`;

const Join = styled.p`
  margin: 0;
  cursor: pointer;
  /* color: #a3a3a3; */
`;

const FindPW = styled.p`
  margin: 0;
  cursor: pointer;
`;

const Other = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-flow: nowrap;
  justify-content: space-around;
`;
