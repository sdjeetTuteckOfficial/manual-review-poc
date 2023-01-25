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
// import AnnotateModal from "../AnnotateModal/AnnotateModal";
import AnnotatePopup from "../AnnotatePopUp/AnnotatePopup";

const Annotate = (props) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectAnnotation] = useState(null);
  const [widthRatioState, setWidthRatioState] = useState("");
  const [heightRatioState, setHeightRatioState] = useState("");
  const [annotateLabel, setAnnotateLabel] = useState("");
  const [edittedAnnotation, setEdittedAnnotation] = useState([]);
  const dispatch = useDispatch();
  const [manualTextAnnotation, setManualTextAnnotation] = useState("");

  //////////this is MINE
  useEffect(() => {
    console.log("props annotate", props);
    const widthRatio = props.width / props.data.width;
    setWidthRatioState(widthRatio);
    const heightRatio = props.height / props.data.height;
    setHeightRatioState(heightRatio);
    const initialAnnotations = props.data.fields.map((item) => {
      const width = item.coordinates.width * widthRatio;
      const height = item.coordinates.height * heightRatio;
      const x = item.coordinates.x * widthRatio;
      const y = item.coordinates.y * heightRatio;
      const co_id = item.coordinates.co_id;
      return {
        width,
        height,
        x,
        y,
        co_id,
      };
    });

    setAnnotations(initialAnnotations);
  }, [props, newAnnotation]);

  const handleMouseDown = (event) => {
    if (selectedId === null && newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      // const id = uuidv4();
      setNewAnnotation([
        {
          x,
          y,
          width: 0,
          height: 0,
          // id
        },
      ]);
    }
  };

  const handleMouseMove = (event) => {
    if (selectedId === null && newAnnotation.length === 1) {
      console.log("handleMouseMove");
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      // const co_id = uuidv4();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          // co_id,
        },
      ]);
    }
  };

  const handleMouseUp = (event) => {
    // console.log("handleMouseUp");
    // console.log("hii>>>", event);
    // console.log("new annotation", newAnnotation);
    // console.log("lets see", selectedId);
    if (
      selectedId === null &&
      newAnnotation.length === 1 &&
      newAnnotation[0].width > 0
    ) {
      console.log("new annotation", newAnnotation);
      annotations.push(...newAnnotation);

      setAnnotations(annotations);
      // setOpenModal(true);
      handleClick(event, newAnnotation);
    } else {
      setNewAnnotation([]);
    }
  };

  const handleMouseEnter = (event) => {
    //dont do anything here
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

  const handleClick = (event, annotation) => {
    console.log("handle click>>>", event, annotation);

    const keyPair = props.data.fields.find(
      (item) => item.co_id === annotation.co_id
    );
    if (keyPair) {
      setManualTextAnnotation(keyPair.value);
      edittedAnnotation.push(annotation);
    }
    setAnchorEl(event.currentTarget);
  };

  // useEffect(() => {

  // }, [open, anchorEl, manualTextAnnotation]);

  const handleClose = () => {
    setAnchorEl(null);
    setManualTextAnnotation("");
    setAnnotateLabel(null);
    setNewAnnotation([]);
    setEdittedAnnotation([]);
  };

  const handleSaveAnnotation = () => {
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
          props.data.id
        )
      );
      setAnchorEl(null);
      setNewAnnotation([]);
    } else {
      console.log("fire");
      const newValues = {
        ...edittedAnnotation[0],
        keyName: annotateLabel,
        widthRatio: widthRatioState,
        heightRatio: heightRatioState,
        text: manualTextAnnotation,
      };
      dispatch(editNewCoordinates(newValues, props.data.id));
      setAnchorEl(null);
      setNewAnnotation([]);
    }
  };

  return (
    <div
      tabIndex={1}
      // onKeyDown={handleKeyDown}
    >
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Stage
        width={props?.width}
        height={props?.height}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <ImageFromUrl
            imageUrl={props.data.url}
            onMouseDown={() => {
              selectAnnotation(null);
            }}
            width={props.width}
            height={props.height}
          />

          {annotationsToDraw.map((annotation, i) => {
            return (
              <Annotation
                key={i}
                shapeProps={annotation}
                isSelected={annotation.co_id === selectedId}
                onSelect={(event) => {
                  console.log("here select");
                  selectAnnotation(annotation.co_id);
                  handleClick(event, annotation, annotation.co_id);
                  // handleSelectedAnnotation(annotation);
                }}
                onChange={(newAttrs, event) => {
                  console.log("here drag");
                  const rects = annotations.slice();
                  rects[i] = newAttrs;
                  handleClick(event, annotation);
                  setAnnotations(rects);
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
              <MenuItem value={10}>Name</MenuItem>
              <MenuItem value={20}>Id</MenuItem>
              <MenuItem value={30}>Mereko utha le re baba!</MenuItem>
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
