import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { Popover } from "@material-ui/core";
import ImageFromUrl from "./ImageFromUrl";
import Annotation from "./Annotation";
import DeleteIcon from "@mui/icons-material/Delete";
import { addNewCorordinates, editNewCoordinates } from "../Redux/action";
import { useDispatch } from "react-redux";
import AnnotatePopup from "../AnnotatePopUp/AnnotatePopup";

const Annotate = ({
  handleAnnotations,
  heightRatioState,
  widthRatioState,
  width,
  height,
  data,
  annotations,
}) => {
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectAnnotation] = useState(null);
  const [annotateLabel, setAnnotateLabel] = useState("");
  const [edittedAnnotation, setEdittedAnnotation] = useState([]);
  const dispatch = useDispatch();
  const [manualTextAnnotation, setManualTextAnnotation] = useState("");

  const masterData = [
    {
      name: "First Name",
      value: 10,
    },
    {
      name: "Last Name",
      value: 20,
    },
    {
      name: "Age",
      value: 30,
    },
    {
      name: "Gender",
      value: 40,
    },
    {
      name: "Id",
      value: 50,
    },
  ];

  //////////this is MINE
  // useEffect(() => {
  //   console.log("wtf");
  //   const widthRatio = props.width / props.data.width;
  //   setWidthRatioState(widthRatio);
  //   const heightRatio = props.height / props.data.height;
  //   setHeightRatioState(heightRatio);
  //   const initialAnnotations = props.data.fields.map((item) => {
  //     const width = item.coordinates.width * widthRatio;
  //     const height = item.coordinates.height * heightRatio;
  //     const x = item.coordinates.x * widthRatio;
  //     const y = item.coordinates.y * heightRatio;
  //     const co_id = item.coordinates.co_id;
  //     return {
  //       width,
  //       height,
  //       x,
  //       y,
  //       co_id,
  //     };
  //   });

  //   setAnnotations(initialAnnotations);
  // }, [props, newAnnotation]);
  const handleMouseDown = (event) => {
    if (selectedId === null && newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      console.log("right here down");
      setNewAnnotation([
        {
          x,
          y,
          width: 0,
          height: 0,
        },
      ]);
    }
  };

  const handleMouseMove = (event) => {
    if (selectedId === null && newAnnotation.length === 1) {
      console.log("handleMouseMove");
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;

      console.log("right here", sx, sy);
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
        },
      ]);
    }
  };

  const handleMouseUp = (event) => {
    if (
      selectedId === null &&
      newAnnotation.length === 1 &&
      newAnnotation[0].width > 0
    ) {
      annotations.push(...newAnnotation);
      handleAnnotations(annotations);
      handleClick(event, newAnnotation);
    } else {
      setNewAnnotation([]);
    }
  };

  const handleMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "crosshair";
  };

  // const handleKeyDown = (event) => {
  //   console.log("handleKeyDown");
  //   if (event.keyCode === 8 || event.keyCode === 46) {
  //     if (selectedId !== null) {
  //       const newAnnotations = annotations.filter(
  //         (annotation) => annotation.co_id !== selectedId
  //       );
  //       setAnnotations(newAnnotations);
  //     }
  //   }
  // };

  const annotationsToDraw = [...annotations, ...newAnnotation];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event, annotation, rects) => {
    if (annotation?.co_id) {
      const keyPair = data.fields.find(
        (item) => item.co_id === annotation.co_id
      );
      const obj = rects.find((item) => item.co_id === annotation.co_id);
      setAnnotateLabel(keyPair.name);
      setManualTextAnnotation(keyPair.value);
      setEdittedAnnotation(obj);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (event, annotation, id) => {
    if (id) {
      const keyPair = data.fields.find(
        (item) => item.co_id === annotation.co_id
      );
      setAnnotateLabel(keyPair.name);
      setManualTextAnnotation(keyPair.value);
      setEdittedAnnotation(annotation);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setManualTextAnnotation("");
    setAnnotateLabel(null);
    setNewAnnotation([]);
    setEdittedAnnotation([]);
    const myArray = annotations.filter((obj) => obj.hasOwnProperty("co_id"));
    console.log("pink floyd ", myArray);
    handleAnnotations(myArray);

    // handleAnnotations(refreshedAnnotations);
  };

  const handleSaveAnnotation = () => {
    console.log("NEW ANNOTATION", newAnnotation);
    const savedAnnotation = newAnnotation[0];
    console.log("editted annotation", edittedAnnotation);
    console.log("saved annotation", savedAnnotation);
    if (edittedAnnotation.length === 0) {
      const id = uuidv4();
      dispatch(
        addNewCorordinates(
          {
            ...savedAnnotation,
            text: manualTextAnnotation,
            keyName: annotateLabel,
            widthRatio: widthRatioState,
            heightRatio: heightRatioState,
            co_id: id,
          },
          data.id
        )
      );
      setAnchorEl(null);
      setManualTextAnnotation("");
      setAnnotateLabel(null);
      setNewAnnotation([]);
      setEdittedAnnotation([]);
    } else {
      console.log("fire");
      const newValues = {
        ...edittedAnnotation,
        keyName: annotateLabel,
        widthRatio: widthRatioState,
        heightRatio: heightRatioState,
        text: manualTextAnnotation,
      };
      dispatch(editNewCoordinates(newValues, data.id));
      setAnchorEl(null);
      setManualTextAnnotation("");
      setAnnotateLabel(null);
      setNewAnnotation([]);
      setEdittedAnnotation([]);
    }
  };

  return (
    <div
      tabIndex={1}
      // onKeyDown={handleKeyDown}
    >
      <Stage
        width={width}
        height={height}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <ImageFromUrl
            imageUrl={data.url}
            onMouseDown={() => {
              selectAnnotation(null);
            }}
            width={width}
            height={height}
          />

          {annotationsToDraw?.map((annotation, i) => {
            return (
              <Annotation
                key={i}
                shapeProps={annotation}
                isSelected={annotation.co_id === selectedId}
                onSelect={(event) => {
                  selectAnnotation(annotation.co_id);
                  handleSelect(event, annotation, annotation.co_id);
                  // handleSelectedAnnotation(annotation);
                }}
                onChange={(newAttrs, event) => {
                  const rects = annotations.slice();
                  rects[i] = newAttrs;
                  handleClick(event, annotation, rects);
                  handleAnnotations(rects);
                  // setAnnotations(rects);
                }}
                // onOpenPopover={(event) => handleClick(event)}
              />
            );
          })}
        </Layer>
      </Stage>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container sx={{ px: 3, pt: 3 }}>
          {" "}
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            fullWidth
            value={manualTextAnnotation}
            onChange={(e) => setManualTextAnnotation(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label" size="small" fullWidth>
              Field
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={annotateLabel}
              label="Annotate Label"
              onChange={(e) => setAnnotateLabel(e.target.value)}
              size="small"
            >
              {masterData.map((item, index) => (
                <MenuItem value={item.value} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ px: 3, py: 3 }}>
          <IconButton color="primary" aria-label="delete" component="label">
            <DeleteIcon />
          </IconButton>
          <Button onClick={handleSaveAnnotation} variant="contained">
            Save
          </Button>
        </Grid>
      </Popover>

      {/* <AnnotatePopup
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      /> */}
    </div>
  );
};

export default Annotate;
