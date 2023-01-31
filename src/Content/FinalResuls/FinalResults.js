import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SingleAnnotation from "./SingleAnnotation";
import { useSelector } from "react-redux";
import { useState } from "react";

const FinalResults = () => {
  let annotedData = useSelector((state) => state.ManualReviewReducers.data);
  // const [annotedDataState, setAnnotedDataState] = useState(annotedData);
  const currentImageId = useSelector(
    (state) => state.ManualReviewReducers.currentIndex
  );
  const currentIndex = annotedData.findIndex(
    (image) => image.id === currentImageId
  );
  const activeFlag = useSelector(
    (state) => state.ManualReviewReducers.activeFlag
  );
  useEffect(() => {
    // console.log("called", activeFlag, annotedData);
  }, [annotedData, activeFlag, currentIndex]);
  console.log("current index", currentIndex);
  return (
    <>
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 3px 14px rgba(0, 0, 0, 0.14)",
          px: 2,
          py: 2,
        }}
      >
        <Grid item md={6}>
          <Typography component="h3">
            Fields{" "}
            <Typography
              component="span"
              sx={{ fontWeight: 300, fontSize: "10px" }}
            >
              {" "}
              Total no. of fields :
              {/* {annotedData[currentIndex].fields.length} */}
            </Typography>
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography>Manage Labels</Typography>
        </Grid>
      </Grid>
      <div style={{ height: "71vh", overflowY: "scroll" }}>
        <Grid container sx={{ px: 2, pt: 2 }}>
          {annotedData[currentIndex]?.fields.map((singleAnnotation) => (
            <SingleAnnotation
              singleAnnotation={singleAnnotation}
              imageId={currentImageId}
            />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default FinalResults;
