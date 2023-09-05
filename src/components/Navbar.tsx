import { styled } from "styled-components";
import { ReactComponent as About } from "../svg/about.svg";
import { ReactComponent as About2 } from "../svg/about2.svg";
import { ReactComponent as Bell } from "../svg/bell.svg";
import { ReactComponent as Chat } from "../svg/chat.svg";
import { ReactComponent as Home } from "../svg/house.svg";
import { ReactComponent as Menu } from "../svg/menu.svg";
import { ReactComponent as MenuBurger } from "../svg/menu-burger.svg";
import { ReactComponent as Pick } from "../svg/pick.svg";
import { ReactComponent as Search } from "../svg/search.svg";
import { ReactComponent as Trophy } from "../svg/trophy.svg";
import { ReactComponent as Upload } from "../svg/upload.svg";
import { ReactComponent as User } from "../svg/user.svg";
import "../css/navbar.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [selectIcon, setSelectIcon] = useState<number>(0);

  if (useLocation().pathname === "/home") {
    // setSelectIcon(2);
    console.log("홈");
  }

  const navigate = useNavigate();

  //
  interface IconInterFace {
    name: string;
    src: any;
  }

  class makeIcon implements IconInterFace {
    name;
    src;
    constructor(a: string, b: any) {
      this.name = a;
      this.src = b;
    }
  }

  function retrunIcon(a: string, b: any): IconInterFace {
    return new makeIcon(a, b);
  }

  const NavIconsArray = [
    retrunIcon(`upload`, Upload),
    retrunIcon(`home`, Home),
    retrunIcon(`chat`, Chat),
    retrunIcon(`profile`, User),
  ];
  const iconFillColor = (selectIcon: number, idx: number): string =>
    selectIcon === idx ? `#923131` : `#0f0f0f`;

  return (
    <>
      <Container>
        {NavIconsArray.map((Icon, idx) => (
          <IconBox key={idx} onClick={(e) => iconClick(e, Icon.name, idx)}>
            <Icon.src
              fill={iconFillColor(selectIcon, idx)}
              className="iconsvg"
            />
            <IconName color={iconFillColor(selectIcon, idx)}>
              {Icon.name}
            </IconName>
          </IconBox>
        ))}
      </Container>
    </>
  );

  function iconClick(e: any, iconname: string, idx: number): void {
    navigate(iconname);
    setSelectIcon(idx);
  }
};

const Container = styled.div`
  width: 500px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  bottom: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const IconBox = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  margin: 0px;
  background-color: rgb(246, 246, 246);
  border-radius: 27.5008px;
`;

const IconName = styled.p`
  margin: 0px;
  font-size: 12px;
  color: ${(props) => props.color};
`;
export default Navbar;
//
