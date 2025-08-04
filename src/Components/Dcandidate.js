import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../Actions/Dcandidate";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Paper,
  Grid,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  withStyles,
  fontSize,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import DcandidateForm from "./DcandidateForm";

const styles = (theme) => ({
  Paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  size: {
    fontSize: "1.25rem",
  },
  root: {
    "&.  MuiTableCell-head": {
      fontSize: "3.25rem",
    },
  },
});

const Dcandidate = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const DeleteId = (id) => {
    if (window.confirm("Are you want delete this id?"))
      props.deleteDcandidate(id, () => {
        window.alert("Deleted");
      });
  };
  useEffect(() => {
    props.fetchallcandidates();
  }, []);
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DcandidateForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.size}>Name</TableCell>
                  <TableCell className={classes.size}>Mobile</TableCell>
                  <TableCell className={classes.size}>Email</TableCell>
                  <TableCell className={classes.size}>Age</TableCell>
                  <TableCell className={classes.size}>BloodGroup</TableCell>
                  <TableCell className={classes.size}>Address</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dcandidatelist.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullname}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                      <TableCell>{record.address}</TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            ></EditIcon>
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => {
                                DeleteId(record.id);
                              }}
                            ></DeleteIcon>
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};
const mapstatetoprops = (state) => ({
  dcandidatelist: state.Dcandidate.list,
});
const mapactiontoprops = {
  fetchallcandidates: actions.fetchall,
  deleteDcandidate: actions.Delete,
};
export default connect(
  mapstatetoprops,
  mapactiontoprops
)(withStyles(styles)(Dcandidate));
