import "./App.css";
import { Grid } from "@mui/material";
import ZoomPinch from "./ImageContainer/ImageContainer";
import { useSelector } from "react-redux";
import Content from "./Content/Content";
import PopoverPopupState from "./AnnotatePopUp/AnnotatePopup";

function App() {
  const bye = useSelector((state) => state.ManualReviewReducers.test);

  return (
    <div>
      {/* <PopoverPopupState /> */}
      <Grid container>
        <Grid item md={8}>
          <ZoomPinch />
        </Grid>
        <Grid item md={4} sx={{ borderLeft: "2px solid beige" }}>
          <Content />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
