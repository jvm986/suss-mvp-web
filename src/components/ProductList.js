import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DialogTitle from "@material-ui/core/DialogTitle";

import ProductCard from "./ProductCard";
import { Dialog } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { getEndPoint } from "../services/user.service";
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
    // height: 300,
  },
}));

function DialogueList(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { handleClose, selectedProduct, open } = props;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle>Recommendations</DialogTitle>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          {selectedProduct.recomendations.slice(0, 3).map((product, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={fixedHeightPaper}>
                    <ProductCard product={product} />
                  </Paper>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </Dialog>
  );
}

export default function ProductList() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [productList, setProductList] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const productListResponse = await getEndPoint("form_responses/");
        setProductList(productListResponse.data);
        setSelectedProduct(productListResponse.data[0]);
        setLoading(false);
      } catch (e) {
        authService.logout();
        history.push("/login");
      }
    }
    fetchData();
  }, [history]);

  return (
    <Container className={classes.container}>
      {!loading ? (
        <React.Fragment>
          <Grid container spacing={3}>
            <React.Fragment>
              {productList.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={12} md={4} lg={4}>
                      <Paper
                        className={fixedHeightPaper}
                        onClick={() => handleOpen(product)}
                      >
                        <ProductCard product={product.product} />
                      </Paper>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          </Grid>
          <DialogueList
            open={open}
            handleClose={handleClose}
            selectedProduct={selectedProduct}
          />
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}
