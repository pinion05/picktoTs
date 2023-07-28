import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Update from "./components/Update";

const AppRouther = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/update" element={<Update />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
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
