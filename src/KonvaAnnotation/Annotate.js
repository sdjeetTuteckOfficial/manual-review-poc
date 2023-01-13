import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import ImageFromUrl from "./ImageFromUrl";
import Annotation from "./Annotation";
// import "./styles.css";

const initialAnnotations = [
  {
    x: 608,
    y: 377,
    width: 496,
    height: 121,
    id: uuidv4(),
  },
  {
    x: 603,
    y: 536,
    width: 811,
    height: 134,
    id: uuidv4(),
  },
];

const Annotate = (props) => {
  const [annotations, setAnnotations] = useState(initialAnnotations);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectAnnotation] = useState(null);
  const [canvasMeasures, setCanvasMeasures] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
    <div tabIndex={1} onKeyDown={handleKeyDown}>
      <Stage
        width={1394}
        height={2047}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <ImageFromUrl
            setCanvasMeasures={setCanvasMeasures}
            imageUrl="https://i.ibb.co/2gb0zbx/Microsoft-Teams-image.jpg"
            onMouseDown={() => {
              // deselect when clicked on empty area
              selectAnnotation(null);
            }}
          />
          {annotationsToDraw.map((annotation, i) => {
            return (
              <Annotation
                key={i}
                shapeProps={annotation}
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
