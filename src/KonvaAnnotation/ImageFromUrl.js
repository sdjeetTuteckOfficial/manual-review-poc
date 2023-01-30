import React, { useState, useEffect } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const ImageFromUrl = ({
  imageUrl,
  setCanvasMeasures,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  width,
  height,
}) => {
  const [image, setImage] = useState(null);
  // const image = useImage(imageUrl);
  useEffect(() => {
    const imageLoad = new window.Image();
    imageLoad.src = imageUrl;
    console.log("imageUrl", imageUrl);
    imageLoad.addEventListener("load", () => {
      setImage(imageLoad);
    });

    return () => imageLoad.removeEventListener("load", null);
  }, [imageUrl]);

  return (
    <Image
      image={image}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default ImageFromUrl;
