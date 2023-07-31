import { styled } from "styled-components";
import { ProviderIcon } from "../model/ProviderIcon";

const ProviderButton: React.FC<ProviderIcon> = ({ name, src }) => {
  return (
    <>
      <Container>
        <LogoImg src={src} />
        <Logintxt>Continue with {name} </Logintxt>
      </Container>
    </>
  );
};
const Container = styled.button`
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px;
`;

const LogoImg = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;
const Logintxt = styled.p`
  margin-left: 100px;
`;

export default ProviderButton;
