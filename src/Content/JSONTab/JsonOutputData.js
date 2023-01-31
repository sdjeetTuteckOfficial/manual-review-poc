import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";

const JsonOutputData = () => {
  let annotedData = useSelector((state) => state.ManualReviewReducers.data);
  const modifiedAnnotedData = JSON.stringify(annotedData);
  const currentImageId = useSelector(
    (state) => state.ManualReviewReducers.currentIndex
  );
  const currentIndex = annotedData.findIndex(
    (image) => image.id === currentImageId
  );
  const activeFlag = useSelector(
    (state) => state.ManualReviewReducers.activeFlag
  );

  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("");
  const [displayData, setDisplayData] = useState(null);
  // const text = modifiedAnnotedData;

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  useEffect(() => {
    const updatedArray = annotedData[currentIndex].fields.map((obj) => {
      const { ["co_id"]: deleted, ...rest } = obj;
      console.log("rest", rest);
      const val = {
        ...rest,
        ...rest.coordinates,
      };

      const { ["coordinates"]: delCo, ...baki } = val;
      const { ["co_id"]: delId, ...elseThing } = baki;

      return elseThing;
    });
    console.log("updated arr", updatedArray);

    // for (let i = 0; i < updatedArray.length; i++) {
    //   delete updatedArray[i].coordinates.co_id;
    // }

    console.log("heyy", updatedArray);
    const values = JSON.stringify(updatedArray);

    setDisplayData(updatedArray);
    setText(values);
  }, [annotedData, activeFlag, currentIndex]);
  return (
    <>
      <Grid container sx={{ px: 2, py: 2 }}>
        <Grid
          item
          xs={12}
          sx={{
            border: "0.5px solid #D2D6DD",
            borderRadius: "7px",
            p: 1,
            height: "75vh",
            overflowY: "scroll",
          }}
        >
          <button onClick={handleCopy}>Copy</button>
          {copied && <p>Copied to clipboard</p>}
          <ReactJson
            src={JSON.parse(JSON.stringify(displayData))}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            theme="grayscale:inverted"
            style={{
              color: "#3C4257",
              fontFamily: "Sora",
              fontSize: "11px",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JsonOutputData;
