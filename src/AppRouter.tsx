import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Update from "./components/Upload";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Join from "./components/Join";

const AppRouther = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login/join" element={<Join />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                component={Profile}
                isAuthenticated={false}
                path={`/profile`}
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
