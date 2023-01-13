import React, { useState } from "react";
import Annotation from "react-image-annotation";
import { RectangleSelector } from "react-image-annotation/lib/selectors";
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import ReactDom from "react-dom";

const Annotator = (props) => {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});
  const [text, setText] = useState();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onChange = (annotation) => {
    setAnnotation(annotation);
  };

  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;

    setAnnotations((prevAnnotations) => [
      ...prevAnnotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ]);
    setAnnotation({});
  };

  const Box = ({ children, geometry, style }) => (
    <div
      style={{
        ...style,
        position: "absolute",
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
      }}
    >
      {children}
    </div>
  );

  function renderSelector({ annotation, active }) {
    const { geometry } = annotation;
    if (!geometry) return null;

    return (
      <Box
        geometry={geometry}
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          border: "solid 1px red",
        }}
      >
        {/* Selected portion */}
      </Box>
    );
  }

  function renderHighlight({ annotation, active }) {
    const { geometry } = annotation;
    if (!geometry) return null;

    return (
      <Box
        key={annotation.data.id}
        geometry={geometry}
        style={{
          border: "solid 1px black",
          boxShadow: active && "0 0 20px 20px rgba(255, 255, 255, 0.3) inset",
        }}
      >
        {/* Custom Highlight */}
      </Box>
    );
  }

  function renderContent({ annotation }) {
    const { geometry } = annotation;
    return (
      <div
        key={annotation.data.id}
        style={{
          background: "black",
          color: "white",
          padding: 10,
          position: "absolute",
          fontSize: 12,
          left: `${geometry.x}%`,
          top: `${geometry.y + geometry.height}%`,
        }}
      >
        {annotation.data && annotation.data.text}
      </div>
    );
  }

  function renderEditor(props) {
    const { geometry } = props.annotation;
    if (!geometry) return null;

    return ReactDom.createPortal(
      <div
        style={{
          background: "white",
          borderRadius: 3,
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: "2",
          transform: "translate(-50%, -50%)",
          //   left: `${geometry.x}%`,
          //   top: `${geometry.y + geometry.height}%`,
          padding: "20px",
          border: "2px solid black",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Text"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) =>
            props.onChange({
              ...props.annotation,
              data: {
                ...props.annotation.data,
                text: e.target.value,
              },
            })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            sx={{ zIndex: "" }}
            label="Age"
            onChange={(e) =>
              props.onChange({
                ...props.annotation,
                data: {
                  ...props.annotation.data,
                  type: e.target.value,
                },
              })
            }
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={props.onSubmit}>Save</Button>
      </div>,
      document.getElementById("typemodal")
    );
    //   <div
    //     style={{
    //       background: "white",
    //       borderRadius: 3,
    //       position: "absolute",
    //       left: `${geometry.x}%`,
    //       top: `${geometry.y + geometry.height}%`,
    //     }}
    //   >
    //     <div>Custom Editor</div>
    //     <input
    //       onChange={(e) =>
    //         props.onChange({
    //           ...props.annotation,
    //           data: {
    //             ...props.annotation.data,
    //             text: e.target.value,
    //           },
    //         })
    //       }
    //     />
    //     <button onClick={props.onSubmit}>Comment</button>
    //   </div>
  }

  function renderOverlay() {
    return (
      <div
        style={{
          //   background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          padding: 5,
          pointerEvents: "none",
          position: "absolute",
          top: 5,
          left: 5,
        }}
      ></div>
    );
  }

  return (
    <>
      {console.log("bhalo lagche na", annotations)}
      <Annotation
        src={props.image}
        annotations={annotations}
        // type={RectangleSelector.TYPE}
        value={annotation}
        onChange={onChange}
        onSubmit={onSubmit}
        renderSelector={renderSelector}
        renderEditor={renderEditor}
        renderHighlight={renderHighlight}
        renderContent={renderContent}
        renderOverlay={renderOverlay}
      />
    </>
  );
};

export default Annotator;
