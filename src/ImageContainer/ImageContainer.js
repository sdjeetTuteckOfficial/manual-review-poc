import React, { useRef, useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import screenshot from "./../assets/screenshot.svg";
import { Grid, IconButton, Button, Box } from "@mui/material";
import add from "../assets/add.svg";
import substract from "../assets/substract.svg";
import previous from "../assets/previous.svg";
import next from "../assets/next.svg";
import center from "../assets/center.svg";
import arrowLeft from "../assets/arrowlft.svg";
import arrowRight from "../assets/arrowrt.svg";
import Annotator from "../Annotation/Annotation";
import Annotate from "../KonvaAnnotation/Annotate";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { test } from "../Redux/action";
function ZoomPinch() {
  const images = useSelector((state) => state.ManualReviewReducers.data);
  const imageRef = useRef();
  const divRef = useRef();
  const dispatch = useDispatch();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [currentImageId, setCurrentImageId] = useState(1);
  const [scale, setScale] = useState(1);
  const currentImage = images.find((image) => image.id === currentImageId);

  const nextImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.id === currentImageId
    );
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImageId(images[nextIndex].id);
  };
  const previousImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.id === currentImageId
    );
    const previousIndex = (currentIndex + images.length - 1) % images.length;
    setCurrentImageId(images[previousIndex].id);
  };

  useEffect(() => {
    if (divRef.current) {
      let height = divRef.current.offsetHeight;
      let width = divRef.current.offsetWidth;
      setHeight(height);
      setWidth(width);
      console.log("I cant sleep", height, width);
    }
  }, [divRef, width, height]);

  return (
    <>
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
                  {/* <Annotator image="https://i.ibb.co/2gb0zbx/Microsoft-Teams-image.jpg" /> */}

                  <Annotate image="" width={width} height={height} />
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
                    {/* <Button onClick={() => dispatch(test("hiiiiiiiiiiiii"))}>
                      Redux😎
                    </Button> */}
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
