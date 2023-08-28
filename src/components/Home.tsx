import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostData } from "../model/interfacePostData";

const Home: React.FC = () => {
  useEffect(() => {
    console.log("home마운트됨");
    sqlPotsRead();
  }, []);

  const [sqlPostRowArray, setSqlPostRowArray] = useState();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  async function sqlPotsRead() {
    try {
      console.log("try진입");

      const list = await axios.get("http://localhost:5000/api/post");
      console.log("next axios");
      console.log("sql 게시글데이터");

      // list.data.forEach((element: PostData) => {
      //   console.log(element);
      // });

      const filterList = list.data.filter((post: PostData) => {
        if (startDate && endDate) {
          if (
            new Date(post.date).getDate() >= startDate.getDate() &&
            new Date(post.date).getDate() <= endDate.getDate()
          )
            return true;
        }
      });

      console.log(filterList);
      console.log(list.data);

      setSqlPostRowArray(filterList);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
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
