import React, { useState } from "react";
import { useDrag } from "react-dnd";

const AnnotationBox = ({ annotation, x, y, width, height, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "ANNOTATION", x, y, width, height },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onMove(item.x, item.y, item.width, item.height);
      }
    },
  });

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {annotation}
    </div>
  );
};

const ImageAnnotation = ({ imageUrl }) => {
  const imageRef = React.useRef(null);
  const [annotations, setAnnotations] = useState([]);

  const handleClick = (event) => {
    const image = imageRef.current;
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = 50;
    const height = 50;
    setAnnotations([...annotations, { x, y, width, height }]);
  };

  const handleMove = (x, y, width, height) => {
    // update the annotation's x,y, width, height coordinates
  };

  return (
    <div>
      <img ref={imageRef} src={imageUrl} onClick={handleClick} />
      {annotations.map((annotation, index) => (
        <AnnotationBox
          key={index}
          annotation={annotation.text}
          x={annotation.x}
          y={annotation.y}
          width={annotation.width}
          height={annotation.height}
          onMove={handleMove}
        />
      ))}
    </div>
  );
};

export default ImageAnnotation;
