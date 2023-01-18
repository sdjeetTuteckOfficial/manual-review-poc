import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import ImageFromUrl from "./ImageFromUrl";
import Annotation from "./Annotation";
import { Grid } from "@mui/material";
// import "./styles.css";

const initialAnnotations = [
  // {
  //   x: 88.76, //0.146
  //   y: 81, //0.215
  //   width: 72.41,
  //   height: 26,
  //   id: uuidv4(),
  // },
  // {
  //   x: 608,
  //   y: 536,
  //   width: 811,
  //   height: 134,
  //   id: uuidv4(),
  // },
  {
    x: 608,
    y: 377,
    width: 496,
    height: 121,
    id: uuidv4(),
  },
  {
    x: 608,
    y: 536,
    width: 811,
    height: 134,
    id: uuidv4(),
  },
  // {
  //   x: 190, //608
  //   y: 118, //377
  //   width: 155, //496
  //   height: 38, //121
  //   id: uuidv4(),
  // },
  // {
  //   x: 186, //608
  //   y: 166, //536
  //   width: 251, //811
  //   height: 41, //134
  //   id: uuidv4(),
  // },
];

const Annotate = (props) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectAnnotation] = useState(null);
  const [canvasMeasures, setCanvasMeasures] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [scale, setScale] = useState(1);

  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [myScaleWidth, setMyscaleWidth] = useState(0);
  const containerRef = useRef();
  const imageToLoad = new window.Image();

  useEffect(() => {
    imageToLoad.src = "https://i.ibb.co/2gb0zbx/Microsoft-Teams-image.jpg";
    imageToLoad.addEventListener("load", () => {
      setImage(imageToLoad);
      setCanvasMeasures({
        width: imageToLoad.width,
        height: imageToLoad.height,
      });
    });

    return () => imageToLoad.removeEventListener("load", null);
  }, []);

  useEffect(() => {
    // console.log("￣へ￣", containerRef);
    // // if (containerRef.current) {
    // //   let height = containerRef.current.offsetHeight;
    // //   let width = containerRef.current.offsetWidth;
    // // }
    // console.log("width height", width, height);
    // setImageWidth(imageToLoad.width);
    // setImageHeight(imageToLoad.height);
    // console.log("hey1", imageToLoad.width);
    // console.log("hey1", imageToLoad.height);
    // setStageWidth(window.innerWidth);
    // setStageHeight(window.innerHeight);
    // const scale = stageWidth / imageWidth;
    // setScale(stageWidth / imageWidth);
    // window.addEventListener("resize", handleResize);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, [containerRef]);

  //////////this is MINE
  useEffect(() => {
    console.log("🙄", props.width, props.height);
    const widthRatio = props.width / 2047;
    const heightRatio = props.height / 1394;

    const modifiedAnnotations = initialAnnotations.map((item) => {
      const width = item.width * widthRatio;
      const height = item.height * heightRatio;
      const x = item.x * widthRatio;
      const y = item.y * heightRatio;
      return {
        width,
        height,
        x,
        y,
      };
    });
    console.log("hello modified", modifiedAnnotations);
    setAnnotations(modifiedAnnotations);
  }, [props.width, props.height]);

  // const handleResize = () => {
  //   setStageWidth(window.innerWidth);
  //   setStageHeight(window.innerHeight);
  // };

  const handleMouseDown = (event) => {
    if (selectedId === null && newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      const id = uuidv4();
      setNewAnnotation([{ x, y, width: 0, height: 0, id }]);
    }
  };

  const handleMouseMove = (event) => {
    if (selectedId === null && newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const id = uuidv4();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          id,
        },
      ]);
    }
  };

  const handleMouseUp = () => {
    if (selectedId === null && newAnnotation.length === 1) {
      annotations.push(...newAnnotation);
      setAnnotations(annotations);
      setNewAnnotation([]);
    }
  };

  const handleMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "crosshair";
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      if (selectedId !== null) {
        const newAnnotations = annotations.filter(
          (annotation) => annotation.id !== selectedId
        );
        setAnnotations(newAnnotations);
      }
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <div
      tabIndex={1}
      onKeyDown={handleKeyDown}
      // ref={containerRef}
    >
      <Stage
        width={props.width}
        height={props.height}
        // scaleX={scale}
        // scaleY={scale}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {/* <Image
            image={image}
            width={300}
            height={300}
            // scaleX={scale}
            // scaleY={scale}
            onMouseDown={() => {
              // deselect when clicked on empty area
              selectAnnotation(null);
            }}
            // onMouseMove={onMouseMove}
            // onMouseUp={onMouseUp}
          /> */}
          <ImageFromUrl
            setCanvasMeasures={setCanvasMeasures}
            imageUrl="https://i.ibb.co/2gb0zbx/Microsoft-Teams-image.jpg"
            onMouseDown={() => {
              selectAnnotation(null);
            }}
            width={props.width}
            height={props.height}
          />

          {console.log("annotations", annotations)}
          {annotationsToDraw.map((annotation, i) => {
            console.log("::", annotation);
            return (
              <Annotation
                key={i}
                // imageWidth={imageWidth}
                // imageHeight={imageHeight}
                shapeProps={annotation}
                scale={scale}
                isSelected={annotation.id === selectedId}
                onSelect={() => {
                  selectAnnotation(annotation.id);
                }}
                onChange={(newAttrs) => {
                  const rects = annotations.slice();
                  rects[i] = newAttrs;
                  setAnnotations(rects);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Annotate;
