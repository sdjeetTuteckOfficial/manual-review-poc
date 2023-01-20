import React from "react";
import { Typography, Popover, Portal } from "@mui/material";
import ReactDom from "react-dom";

const AnnotatePopup = (props) => {
  return (
    <Portal>
      {console.log(">>>>>>>", props.open, props)}
      <Popover
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Portal>
  );
  // return ReactDom.createPortal(
  //   <Popover
  //     id={props.id}
  //     open={props.open}
  //     anchorEl={props.anchorEl}
  //     onClose={props.handleClose}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //   >
  //     <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
  //   </Popover>,
  //   document.getElementById("popper")
  // );
};

export default AnnotatePopup;
