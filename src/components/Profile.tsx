import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { loginde, login, logout } = useStore();
  useEffect(() => {
    if (loginde === false) navigate("login");
  }, []);
  return (
    <>
      <></>
    </>
  );
};

export default Profile;
