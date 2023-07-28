import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Update from "./components/Update";

const AppRouther = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<Update />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Navbar></Navbar>
    </BrowserRouter>
  );
};

export default AppRouther;
