import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Grid, Avatar, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  getEndPoint,
  postEndPoint,
  putEndPoint,
} from "../services/user.service";
import authService from "../services/auth.service";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 600,
  },
  smallSpacer: {
    height: 50,
  },
}));

export default function UserProfile() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [valueWeights, setValueWeights] = useState({
    Animals: { id: null, weight: 25, value: 1, responder: userId },
    Waste: { id: null, weight: 25, value: 2, responder: userId },
    People: { id: null, weight: 25, value: 3, responder: userId },
    Climate: { id: null, weight: 25, value: 4, responder: userId },
    Me: { id: null, weight: 25, value: 5, responder: userId },
  });
  const history = useHistory();

  const handleValueSubmit = () => {
    setLoading(true);
    async function postValue(data, key) {
      try {
        delete data.id;
        const response = await postEndPoint("responder_value_weight/", data);
        setValueWeights((valueWeights) => ({
          ...valueWeights,
          [key]: {
            id: response.data.id,
            weight: valueWeights[key].weight,
            value: valueWeights[key].value,
            responder: userId,
          },
        }));
      } catch (e) {}
    }
    async function putValue(data) {
      try {
        await putEndPoint(`responder_value_weight/${data.id}/`, data);
      } catch (e) {}
    }
    Object.keys(valueWeights).map((key) => {
      if (valueWeights[key].id !== null) {
        putValue(valueWeights[key]);
      } else {
        postValue(valueWeights[key], key);
      }
      return key;
    });
    setLoading(false);
  };

  const handleValueChange = (category, newValue) => {
    setValueWeights((valueWeights) => ({
      ...valueWeights,
      [category]: {
        id: valueWeights[category].id,
        weight: newValue,
        value: valueWeights[category].value,
        responder: userId,
      },
    }));
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const responderValueWeights = await getEndPoint(
          "responder_value_weight/"
        );
        responderValueWeights.data.map((value) => {
          setValueWeights((valueWeights) => ({
            ...valueWeights,
            [value.value_name]: {
              id: value.id,
              weight: value.weight,
              value: value.value,
              responder: userId,
            },
          }));
          return value;
        });
        setLoading(false);
      } catch (e) {
        authService.logout();
        history.push("/login");
      }
    }
    fetchData();
  }, [history, userId]);

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={3}>
          <Avatar onClick={(e) => console.log(valueWeights.Animals)}>S</Avatar>
        </Grid>
        <Grid item xs={6}>
          <Typography id="continuous-slider" gutterBottom>
            {JSON.parse(localStorage.getItem("user")).email}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.smallSpacer} />
      {!loading ? (
        <React.Fragment>
          <Typography id="continuous-slider" gutterBottom>
            Animals
          </Typography>
          <Slider
            onChange={(event, value) => handleValueChange("Animals", value)}
            value={valueWeights.Animals.weight}
          ></Slider>
          <Typography id="continuous-slider" gutterBottom>
            Waste
          </Typography>
          <Slider
            onChange={(event, value) => handleValueChange("Waste", value)}
            value={valueWeights.Waste.weight}
          ></Slider>
          <Typography id="continuous-slider" gutterBottom>
            People
          </Typography>
          <Slider
            onChange={(event, value) => handleValueChange("People", value)}
            value={valueWeights.People.weight}
          ></Slider>
          <Typography id="continuous-slider" gutterBottom>
            Climate
          </Typography>
          <Slider
            onChange={(event, value) => handleValueChange("Climate", value)}
            value={valueWeights.Climate.weight}
          ></Slider>
          <Typography id="continuous-slider" gutterBottom>
            Me
          </Typography>
          <Slider
            onChange={(event, value) => handleValueChange("Me", value)}
            value={valueWeights.Me.weight}
          ></Slider>
          <Button variant="contained" onClick={handleValueSubmit}>
            Submit
          </Button>

          <div className={classes.smallSpacer} />
          <Typography id="continuous-slider" gutterBottom>
            Upload a New Product Image!
          </Typography>
          <input type="file" id="file_field" name="file" />
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}
