import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import UserProfile from "./UserProfile";
import ProductList from "./ProductList";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function UserHome() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="h4">Your Products</Typography>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={3}>
          <UserProfile />
        </Grid>
      </Grid>
    </Container>
  );
}
