import "./App.css";
import { Grid, Typography } from "@mui/material";
import ZoomPinch from "./ImageContainer/ImageContainer";
import { useSelector } from "react-redux";
import { Content } from "./Content/Content";
import Annotate from "./KonvaAnnotation/Annotate";

function App() {
  const bye = useSelector((state) => state.ManualReviewReducers.test);

  return (
    <div>
      {/* <Annotate /> */}
      <Grid container>
        <Grid item md={6}>
          <ZoomPinch />
        </Grid>
        <Grid item md={6}>
          <Content />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
