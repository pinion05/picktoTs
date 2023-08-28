import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostData } from "../model/interfacePostData";

const Home: React.FC = () => {
  useEffect(() => {
    sqlPotsRead();
  }, []);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [readSQL, setReadSQL] = useState<any>();
  const [renderPosts, setRenderPosts] = useState();

  async function sqlPotsRead() {
    try {
      const allPosts = await axios.get("http://localhost:5000/api/post");
      console.log(allPosts.data);

      //
      setReadSQL(allPosts.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("날자변경됨");
    changeDate();
  }, [startDate, endDate]);

  async function changeDate() {
    if (readSQL) {
      const filterdarray = await readSQL.filter((post: PostData) => {
        if (startDate && endDate) {
          if (
            new Date(post.date).getDate() >= startDate.getDate() &&
            new Date(post.date).getDate() <= endDate.getDate()
          )
            return true;
        }
      });
      setRenderPosts(filterdarray);
    }
  }

  return (
    <>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <WebTitle>PICKTO</WebTitle>
      <ArrayContainer column={3} imgArray={renderPosts} />
    </>
  );
};
export default Home;

const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;
