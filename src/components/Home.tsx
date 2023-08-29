import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostData } from "../model/interfacePostData";
import { Spacing, Wrap } from "../styledComponent";

const Home: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [allPost, setAllPost] = useState<any>();
  const [renderPosts, setRenderPosts] = useState();

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
  }, [allPost]);

  //* allPost state애 값을 저장
  async function getAllPost() {
    try {
      const allPosts = await axios.get("http://localhost:5000/api/post");
      console.log("state에 저장되는 값--------------");
      console.log(allPosts.data);
      console.log("state에 저장되는 값--------------");

      setAllPost(allPosts.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("날자변경됨");
    changeDate();
  }, [startDate, endDate]);

  async function changeDate() {
    if (allPost) {
      const filterdarray = await allPost.filter((post: PostData) => {
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
