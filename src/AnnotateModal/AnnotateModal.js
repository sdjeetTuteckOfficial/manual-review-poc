import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  IconButton,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AnnotateModal(props) {
  const [open, setOpen] = useState(props.open);
  const [data, setData] = useState(props.modalData);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => {
    props.handleClose();
  };

  useEffect(() => {
    setOpen(props.open);
    setData(props.modalData);
  }, [props.open, props.modalData]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent sx={{ my: 3, width: "300px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            fullWidth
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label" size="small" fullWidth>
              Field
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              size="small"
            >
              <MenuItem value={10}>Name</MenuItem>
              <MenuItem value={20}>Id</MenuItem>
              <MenuItem value={30}>Mereko utha le re baba!</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between">
            <IconButton color="primary" aria-label="delete" component="label">
              <DeleteIcon />
            </IconButton>
            <Button onClick={handleClose} variant="contained">
              Save
            </Button>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
