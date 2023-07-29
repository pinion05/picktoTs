import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useEffect } from "react";
import { styled } from "styled-components";

const Profile = () => {
  // const navigate = useNavigate();
  // const { loginde, login, logout } = useStore();

  return (
    <>
      <Container></Container>
    </>
  );
};

export default Profile;

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: #fcfcfc;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
