import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const Content = () => {
  const val = useSelector((state) => state.ManualReviewReducers.test);

  return (
    <div>
      {console.log("bye", val)}
      {val}
    </div>
  );
};
