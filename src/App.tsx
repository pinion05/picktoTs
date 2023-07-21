import "normalize.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { styled } from "styled-components";

function App() {
  return (
    <div className="App">
      <Container></Container>
      {/* <Navbar></Navbar> */}
    </div>
  );
}

const Container = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;
  background-color: skyblue;
  display: flex;
`;

export default App;
