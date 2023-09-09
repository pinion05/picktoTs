import { styled } from "styled-components";
import { ProviderIcon } from "../model/ProviderIcon";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { Spacing } from "../styledComponent";
import { Button } from "@mui/material";
//
const ProviderButton: React.FC<ProviderIcon> = ({ name, src }) => {
  //
  const { loginConditon, logout, login, setUserName } = useStore();
  //
  const navigate = useNavigate();
  //
  //
  //
  const click = () => {
    alert("업데이트 예정");
  };
  //
  //
  return (
    <>
      <Button onClick={() => click()}>
        <LogoImg src={src} />
        <Spacing width="100px" />
        <span>Continue with {name} </span>
      </Button>
    </>
  );
};

const LogoImg = styled.img`
  width: 25px;
  height: 25px;
`;

export default ProviderButton;
