import React, { useRef, useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Grid, IconButton, Button, Box } from "@mui/material";
import add from "../assets/add.svg";
import substract from "../assets/substract.svg";
import previous from "../assets/previous.svg";
import next from "../assets/next.svg";
import center from "../assets/center.svg";
import arrowLeft from "../assets/arrowlft.svg";
import arrowRight from "../assets/arrowrt.svg";
import Annotate from "../KonvaAnnotation/Annotate";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { activeFlagFalse } from "../Redux/action";
function ZoomPinch() {
  const annotedData = useSelector((state) => state.ManualReviewReducers.data);
  const activeFlag = useSelector(
    (state) => state.ManualReviewReducers.activeFlag
  );
  console.log("here annoted", annotedData);
  const divRef = useRef();
  const dispatch = useDispatch();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [currentImageId, setCurrentImageId] = useState(annotedData[0].id);
  const [annotations, setAnnotations] = useState([]);
  const [widthRatioState, setWidthRatioState] = useState("");
  const [heightRatioState, setHeightRatioState] = useState("");

  const [scale, setScale] = useState(1);
  const currentImage = annotedData.find((image) => image.id === currentImageId);

  const nextImage = () => {
    const currentIndex = annotedData.findIndex(
      (image) => image.id === currentImageId
    );
    const nextIndex = (currentIndex + 1) % annotedData.length;
    setCurrentImageId(annotedData[nextIndex].id);
  };
  const previousImage = () => {
    const currentIndex = annotedData.findIndex(
      (image) => image.id === currentImageId
    );
    const previousIndex =
      (currentIndex + annotedData.length - 1) % annotedData.length;
    setCurrentImageId(annotedData[previousIndex].id);
  };

  useEffect(() => {
    console.log("active flag", activeFlag);
    let height, width;
    let imageHeight;
    const imageToLoad = new window.Image();
    imageToLoad.src = currentImage.url;

    console.log("heyyyyyyyy", currentImage);
    imageToLoad.addEventListener("load", () => {
      imageHeight = imageToLoad.height;
    });
    if (divRef.current) {
      height = divRef.current.offsetHeight;
      width = divRef.current.offsetWidth;
      // if (imageToLoad.height < height) {
      //   setHeight(imageToLoad.height);
      //   setWidth(width);
      // } else {
      //   setHeight(height);
      //   setWidth(width);
      // }

      setHeight(height);
      setWidth(width);
      const widthRatio = width / currentImage.width;
      setWidthRatioState(widthRatio);
      const heightRatio = height / currentImage.height;
      setHeightRatioState(heightRatio);
      const initialAnnotations = currentImage.fields.map((item) => {
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
      activeFlagFalse(false);
    }
  }, [
    divRef,
    width,
    height,
    currentImage.url,
    // imageToLoad,
    currentImage.fields,
    currentImage.width,
    currentImage.height,
    activeFlag,
  ]);

  const handleAnnotations = (val) => {
    setAnnotations(val);
  };

  return (
    <>
      {console.log("annoted data", annotedData)}
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        panning={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <div className="imageHeight" ref={divRef}>
                <TransformComponent>
                  <Annotate
                    data={currentImage}
                    width={width}
                    height={height}
                    annotations={annotations}
                    widthRatioState={widthRatioState}
                    heightRatioState={heightRatioState}
                    handleAnnotations={handleAnnotations}
                  />
                </TransformComponent>

                <Box className="navigation">
                  <IconButton className="prev" onClick={previousImage}>
                    <img
                      src={previous}
                      alt="prev"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                  <IconButton className="next" onClick={nextImage}>
                    <img
                      src={next}
                      alt="next"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </Box>
              </div>
            </Grid>

            <footer className="footerSet">
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ px: 5, py: 1 }}
              >
                <Grid item md={4}>
                  <Button
                    variant="text"
                    startIcon={<img src={arrowRight} alt="previous" />}
                    onClick={previousImage}
                  >
                    Previous
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Grid container justifyContent="center">
                    <div className="zoomDiv">
                      <IconButton
                        color="primary"
                        aria-label="zoom in"
                        component="label"
                        onClick={() => zoomIn()}
                      >
                        <img src={add} alt="plus" />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="zoom out"
                        component="label"
                        onClick={() => zoomOut()}
                      >
                        <img src={substract} alt="substract" />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="xing"
                        component="label"
                        onClick={() => resetTransform()}
                      >
                        <img src={center} alt="center" />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
                <Grid item md={4}>
                  <Grid container justifyContent="right">
                    <Button
                      variant="text"
                      endIcon={<img src={arrowLeft} alt="next" />}
                      onClick={nextImage}
                    >
                      Go to next File
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </footer>
          </React.Fragment>
        )}
      </TransformWrapper>
    </>
  );
}

export default ZoomPinch;
