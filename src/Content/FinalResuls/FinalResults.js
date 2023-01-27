import React from "react";
import { Grid, Typography } from "@mui/material";

const FinalResults = () => {
  return (
    <Grid
      container
      sx={{
        background: "#FFFFFF",
        boxShadow: "0px 3px 14px rgba(0, 0, 0, 0.14)",
        px: 2,
        py: 2,
      }}
    >
      <Grid item md={6}>
        <Typography component="h3">
          Fields{" "}
          <Typography
            component="span"
            sx={{ fontWeight: 300, fontSize: "10px" }}
          >
            {" "}
            Total no. of fields : 30
          </Typography>
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography>Manage Labels</Typography>
      </Grid>
    </Grid>
  );
};

export default FinalResults;
