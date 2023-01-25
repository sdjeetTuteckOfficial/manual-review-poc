import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import kyahai from "../assets/kyahai.jfif";

export const Content = () => {
  const val = useSelector((state) => state.ManualReviewReducers.test);

  return (
    <div>
      {/* {console.log("bye", val)}
      {val} */}
      <br />
      motivation
      <br />
      <img src={kyahai} />
    </div>
  );
};
