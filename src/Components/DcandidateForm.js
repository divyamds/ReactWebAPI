import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../Actions/Dcandidate";
import axios from "axios";
import {
  Grid,
  TextField,
  withStyles,
  minWidth,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  offsetWidth,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
const intialfieldvalues = {
  fullname: "",
  mobile: "",
  email: "",
  bloodGroup: "",
  age: "",
  address: "",
};

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    "& .MuiSelect-root": {
      margin: theme.spacing(1),
      minWidth: 200,
    },

    "& .MuiButton-root": {
      margin: theme.spacing(1),
      minWidth: 100,
    },
  },
});
const DcandidateForm = ({ classes, ...props }) => {
  const handlesubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (props.currentId == 0)
        props.createDcandidate(values, () => {
          resetForm();
          window.alert("inserted");
        });
      else
        props.updateDcandidate(props.currentId, values, () => {
          resetForm();
          window.alert("updated");
        });
    }
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setlabelWidth] = React.useState(0);
  React.useEffect(() => {
    setlabelWidth(inputLabel.current.offsetWidth);
  }, []);

  //material-ui select
  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldvalues)
      temp.fullname = fieldvalues.fullname ? "" : "this field is required";
    if ("mobile" in fieldvalues)
      temp.mobile = fieldvalues.mobile ? "" : "this field is required";

    if ("bloodGroup" in fieldvalues)
      temp.bloodGroup = fieldvalues.bloodGroup ? "" : "this field is required";
    if ("email" in fieldvalues)
      temp.email = /^$|.+@.+..+/.test(fieldvalues.email)
        ? ""
        : "email not valid";
    seterrors({
      ...temp,
    });
    if (fieldvalues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, seterrors, setvalues, handleInputchange, resetForm } =
    useForm(intialfieldvalues, validate, props.setCurrentId);
  useEffect(() => {
    if (props.currentId != 0)
      setvalues({
        ...props.dcandidatelist.find((x) => x.id == props.currentId),
      });
    seterrors({});
  }, [props.currentId]);
  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handlesubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullname"
            variant="outlined"
            label="Full Name"
            value={values.fullname}
            onChange={handleInputchange}
            {...(errors.fullname && {
              error: true,
              helperText: errors.fullname,
            })}
          />
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputchange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="E-mail"
            value={values.email}
            onChange={handleInputchange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputchange}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputchange}
          />
          <FormControl
            variant="outlined"
            className="formcontrol"
            {...(errors.bloodGroup && { error: true })}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              label="BloodGroup"
              labelWidth={labelWidth}
              onChange={handleInputchange}
            >
              <MenuItem value=" ">select BloodGroup</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="contained" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
const mapstatetoprops = (state) => ({
  dcandidatelist: state.Dcandidate.list,
});
const mapactiontoprops = {
  createDcandidate: actions.create,
  updateDcandidate: actions.update,
};
export default connect(
  mapstatetoprops,
  mapactiontoprops
)(withStyles(styles)(DcandidateForm));
