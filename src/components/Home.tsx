import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostData } from "../model/interfacePostData";
import { Spacing, Wrap } from "../styledComponent";
import moment, { months } from "moment";

const Home: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [allPosts, setAllPosts] = useState<any>();
  const [renderPosts, setRenderPosts] = useState();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    getAllPost();
  }, []);

  //!                             posts 테이블에서 모든 데이터를 가져옴
  async function getAllPost() {
    try {
      const allPosts = await axios.get("http://localhost:5000/post");
      await setAllPosts(allPosts.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
  }, [allPosts]);

  useEffect(() => {
    console.log("날자변경됨");
    changeDate();
  }, [startDate, endDate]);

  async function changeDate() {
    if (allPosts) {
      const realStartDate = moment(startDate).startOf("day");
      const realEndtDate = moment(endDate).endOf("day");
      const filterdarray = await allPosts.filter((post: PostData) => {
        const postDate = moment(post.date);
        if (postDate.isBetween(realStartDate, realEndtDate)) return true;
      });

      setRenderPosts(filterdarray);
    }
  }

  return (
    <>
      <Spacing height="10px" />
      <Wrap dir="row">
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
        <Spacing width="20px" />
        <span>~~</span>
        <Spacing width="20px" />
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
      </Wrap>
      <Spacing height="25px" />

      <WebTitle>PICKTO</WebTitle>

      <ArrayContainer postDataArray={renderPosts} />
    </>
  );
};
export default Home;

const WebTitle = styled.p`
  float: left;
  position: absolute;
  left: 10px;
`;
