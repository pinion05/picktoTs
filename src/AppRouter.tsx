import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const AppRouther = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" />
        <Route path="/update" />
        <Route path="/gallery" />
        <Route path="/chat" />
        <Route path="/profile" />
      </Routes>
      <Navbar></Navbar>
    </BrowserRouter>
  );
};

export default AppRouther;
