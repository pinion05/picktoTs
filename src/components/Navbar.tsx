import { styled } from "styled-components";
import { ReactComponent as About } from "../data/svg/about.svg";
import { ReactComponent as About2 } from "../data/svg/about2.svg";
import { ReactComponent as Bell } from "../data/svg/bell.svg";
import { ReactComponent as Chat } from "../data/svg/chat.svg";
import { ReactComponent as House } from "../data/svg/house.svg";
import { ReactComponent as Menu } from "../data/svg/menu.svg";
import { ReactComponent as MenuBurger } from "../data/svg/menu-burger.svg";
import { ReactComponent as Pick } from "../data/svg/pick.svg";
import { ReactComponent as Search } from "../data/svg/search.svg";
import { ReactComponent as Trophy } from "../data/svg/trophy.svg";
import { ReactComponent as Upload } from "../data/svg/upload.svg";
import { ReactComponent as User } from "../data/svg/user.svg";

const Navbar = () => {
  // const NavIconsArray = [House, Pick, Chat, User];

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

  function retrunIcon(a: string, b: any) {
    return new makeIcon(a, b);
  }

  const NavIconsArray = [
    retrunIcon(`house`, House),
    retrunIcon(`chat`, Chat),
    retrunIcon(`upload`, Upload),
  ];

  return (
    <>
      <Container>
        {NavIconsArray.map((Icon, idx) => (
          <>
            <Icon.src idx={idx} width={`25px`} height={`25px`} />
          </>
        ))}
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 500px;
  height: 100px;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;
  transform: translate(-50%);
  border-radius: 16px;
`;
export default Navbar;
