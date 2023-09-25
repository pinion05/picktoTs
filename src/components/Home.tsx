import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ArrayContainer from "./ArrayContainer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostData } from "../model/interfacePostData";
import { Spacing, Wrap } from "../styledComponent";
import moment from "moment";
import { Cookies } from "react-cookie";
import Radio from "@mui/material/Radio";
import { Box, FormControlLabel, RadioGroup } from "@mui/material";
import { type } from "os";

const Home = (): JSX.Element => {
  const cookies = new Cookies();
  const [selectedValue, setSelectedValue] = useState<string>("recently");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [allPosts, setAllPosts] = useState<any>();
  const [renderPosts, setRenderPosts] = useState();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // console.log(cookies.get("accessToken"));
    getAllPost();
  }, []);

  //!                             post들의 좋아요수 반환 + 원본 오브젝트에 새로운 프로퍼티 추가해야함
  function coutfamouse() {
    try {
    } catch (error) {}
  }

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
    // console.log("날자변경됨");
    changeDate();
  }, [startDate, endDate]);

  //!                                 날자로  랜더링 필터 필터링
  async function changeDate() {
    if (allPosts) {
      const realStartDate = moment(startDate).startOf("day");
      const realEndtDate = moment(endDate).endOf("day");

      const filterdarray = await allPosts.filter((post: PostData) => {
        const postDate = moment(post.date);
        if (postDate.isBetween(realStartDate, realEndtDate)) return true;
      });

      // const sortFilterArray = filterdarray.map((ele: PostData) => {
      //   try {
      //     const response = await axios.get(
      //       `'http://localhost:5000/voteCount'${ele.id}`
      //     );
      //     ele.votecount = response.data.length;
      //   } catch (error) {
      //     console.log(`좋아요갯수 조회중 에러`);
      //     console.log(error);
      //   }
      // });

      setRenderPosts(filterdarray);
    }
  }

  const handleRadioChange = (e: any) => {
    console.log("e.target.value: ", e.target.value);
    setSelectedValue(e.target.value);
  };

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
      <Box sx={{ display: "flex", gap: 2 }}>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          defaultValue={`recently`}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="recently" control={<Radio />} label="최근" />
          <FormControlLabel value="famouse" control={<Radio />} label="인기" />
        </RadioGroup>
      </Box>
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
