import "normalize.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { styled } from "styled-components";
import { Styled } from "styled-components/dist/constructors/constructWithOptions";
import AppRouther from "./AppRouter";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouther />
    </div>
  );
};

export default App;
