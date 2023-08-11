import { styled } from "styled-components";
import { ProviderIcon } from "../model/ProviderIcon";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app, initFbase } from "../fbase";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
//
const ProviderButton: React.FC<ProviderIcon> = ({ name, src }) => {
  //
  initFbase();
  const { loginConditon, logout, login, setUserName } = useStore();
  //
  const navigate = useNavigate();
  //
  const auth = getAuth();
  //
  const provider = new GoogleAuthProvider();
  //
  const containerSubmit = () => {
    if (name === `google`) {
      console.log(name);
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          alert(`${user.displayName} 로그인됨`);
          login();
          setPersistence(auth, browserLocalPersistence);
          navigate(`/profile`);
          console.log(user);
          if (user.displayName !== null) {
            setUserName(user.displayName);
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          //
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  };
  //
  //
  return (
    <>
      <ButtonBody onClick={containerSubmit}>
        <LogoImg src={src} />
        <Logintxt>Continue with {name} </Logintxt>
      </ButtonBody>
    </>
  );
};
const ButtonBody = styled.button`
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
