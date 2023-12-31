import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Join from "./components/Join";
import { useStore } from "./store";

const AppRouther = () => {
  const { loginConditon, logout, login } = useStore();
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/"
            element={
              <PrivateRoute
                component={Home}
                isAuthenticated={false}
                path={`/home`}
              />
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute
                component={Upload}
                isAuthenticated={loginConditon}
                path={`/login`}
              />
            }
          />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/join" element={}></Route> */}
          <Route path="/join" element={<Join />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                component={Profile}
                isAuthenticated={loginConditon}
                path={`/login`}
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Navbar />
      </Container>
    </BrowserRouter>
  );
};

export default AppRouther;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;
