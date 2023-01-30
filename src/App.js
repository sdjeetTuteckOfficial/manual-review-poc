import { useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import ZoomPinch from "./ImageContainer/ImageContainer";
import { loadInitialData } from "./Redux/action";
import { useDispatch, useSelector } from "react-redux";
import Content from "./Content/Content";
import PopoverPopupState from "./AnnotatePopUp/AnnotatePopup";

function App() {
  const dispatch = useDispatch();

  const data = [
    {
      id: 1,
      // url: "https://picsum.photos/id/1/200/300",
      url: "https://i.ibb.co/2gb0zbx/Microsoft-Teams-image.jpg",
      width: 2047,
      height: 1394,
      fields: [
        {
          co_id: 1234,
          value: "Chiranjit Sen",
          name: 10,
          coordinates: {
            co_id: 1234,
            x: 608,
            y: 377,
            width: 496,
            height: 121,
          },
        },
        {
          co_id: 1331,
          value: "Anil Sen",
          name: 20,
          coordinates: {
            co_id: 1331,
            x: 608,
            y: 536,
            width: 811,
            height: 134,
          },
        },
      ],
    },
    {
      id: 2,
      // url: "https://picsum.photos/id/2/200/300",
      url: "https://i.postimg.cc/3Rm46VRn/voter.jpg",
      width: 236,
      height: 314,
      fields: [
        {
          co_id: 1444,
          value: "IDOCUSENSE",
          name: 20,
          coordinates: {
            x: 55,
            y: 91,
            width: 66,
            height: 22,
            co_id: 1444,
          },
        },
        {
          co_id: 1290,
          value: "123456789012",
          name: 20,
          coordinates: {
            x: 72,
            y: 188,
            width: 33,
            height: 28,
            co_id: 1290,
          },
        },
      ],
    },
  ];

  useEffect(() => {
    //___*( ￣皿￣)/#____ CALL api here
    dispatch(loadInitialData(data, data[0].id));
  }, []);

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
