import React, { useEffect, useState } from "react";
import { TextField, Typography, IconButton, Grid } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { editValue } from "../../Redux/action";

const SingleAnnotation = ({ singleAnnotation, imageId }) => {
  const masterData = useSelector(
    (state) => state.ManualReviewReducers.masterData
  );

  const data = masterData.find((item) => item.value === singleAnnotation.name);

  const [value, setValue] = useState(singleAnnotation.value);

  useEffect(() => {
    console.log("here we are>>>", singleAnnotation);
    setValue(singleAnnotation.value);
  }, [singleAnnotation]);
  const dispatch = useDispatch();
  const handleEdittedData = () => {
    const newValues = {
      ...singleAnnotation,
      value: value,
    };
    console.log("newValues", newValues, imageId);
    dispatch(editValue(newValues, imageId));
  };
  return (
    <>
      <Typography sx={{ fontSize: "10px", pb: 1, pt: 1 }}>
        {data.name}
      </Typography>
      <Grid container>
        <Grid item md={11}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ marginRight: 4 }}
          />
        </Grid>
        <Grid item md={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleEdittedData}
          >
            <SaveOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleAnnotation;
