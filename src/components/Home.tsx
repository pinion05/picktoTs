import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import axios from "axios";

const Home: React.FC = () => {
  const img1 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/0e39e762-ac1a-4f2f-84ee-0dc0a4e5788f.png";

  const img2 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/2f221cd0-2f02-4c66-bf59-1457cb6494e1.png";

  const img3 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/2f221cd0-2f02-4c66-bf59-1457cb6494e1.png";

  const img4 =
    "https://testbucket12342563.s3.ap-northeast-2.amazonaws.com/2f221cd0-2f02-4c66-bf59-1457cb6494e1.png";

  const imgArray = [img1, img2, img3, img4];

  const [sqlPostRowArray, setSqlPostRowArray] = useState();

  useEffect(() => {
    sqlPotsRead();
  }, []);

  async function sqlPotsRead() {
    const list = await axios.get("http://localhost:5000/api/post");
    console.log(list.data);
    setSqlPostRowArray(list.data);
  }

  return (
    <>
      <WebTitle>PICKTO</WebTitle>
      <ArrayContainer column={3} imgArray={sqlPostRowArray} />
    </>
  );
};
export default Home;

const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;
