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

const Login: React.FC = () => {
  const { loginConditon, logout, login } = useStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //
  const logoImgs: ProviderIcon[] = [
    { name: "google", src: google },
    { name: "facebook", src: facebook },
    { name: "github", src: github },
    { name: "apple", src: apple },
    { name: "guest", src: guest },
  ];
  function submitContainer(e: any) {
    e.preventDefault();
  }
  const navigate = useNavigate();
  function joinClick() {
    navigate("/join");
  }

  function isValidEmail(email: string) {
    const regex = /^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  async function clickLogin() {
    // console.log("login button click");
    try {
      // console.log("enter try");
      const userInfo = await emailPasswordRequset();
      console.log(userInfo);

      // console.log(userInfo);
      if (userInfo.password === password) {
        // console.log("비밀번호 일치");

        if (isValidEmail(email)) {
          // alert("로그인 이메일확인됨");
          login();
          navigate("/profile");
          console.log("유저정보 일치");
          sessionStorage.clear();
          sessionStorage.setItem("userName", userInfo.nickname);
          sessionStorage.setItem("userID", userInfo.id);
          sessionStorage.setItem("userEmail", userInfo.email);
        } else {
          alert("이메일 형식이 맞지 않습니다.");
        }
      }
    } catch {
      if (email === "") {
        alert("이메일을 입력해주세요");
      } else {
        alert("로그인실패함");
        console.log("로그인 실패함");
      }
    }
  }

  async function emailPasswordRequset() {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: email,
        password: password,
      });
      console.log(response);

      if (response.status === 200) {
        // console.log("유저 정보:", response.data[0]);
        return response.data[0];
        // 결과를 반환합니다.
      } else {
        console.log("유저 정보를 조회하는데 실패했습니다:", response.data);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      <Container onSubmit={submitContainer}>
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

const Container = styled.form`
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
