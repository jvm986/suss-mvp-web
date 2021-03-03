import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography, Button } from "@material-ui/core";

import getEndPoint from "../services/user.service";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default function ProductEntry() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    product: "",
    category: "1111",
    brand: "",
    claims: [],
    values: [],
    file: null,
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    console.log(event.target);
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    console.log(formData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const brandsData = await getEndPoint("brands/");
      const categoriesData = await getEndPoint("product_categories/");
      const valuesData = await getEndPoint("values/");
      const claimsData = await getEndPoint("claims/");
      setBrands(brandsData.data);
      setCategories(categoriesData.data);
      setValues(valuesData.data);
      setClaims(claimsData.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Product Entry</Typography>
            <FormControl fullWidth>
              <TextField
                onChange={(e) =>
                  setFormData({ ...FormData, name: e.target.value })
                }
                id="standard-basic"
                label="Product Name"
                name="product"
              />
              <Autocomplete
                onChange={handleChange}
                options={categories}
                getOptionLabel={(option) => option.product_category}
                renderInput={(params) => (
                  <TextField {...params} label="Category" margin="normal" />
                )}
              />
              <Autocomplete
                onChange={handleChange}
                options={brands}
                getOptionLabel={(option) => option.brand}
                name="brand"
                renderInput={(params) => (
                  <TextField {...params} label="Brand" margin="normal" />
                )}
              />
              <Autocomplete
                onChange={(e, val) =>
                  setFormData({ ...FormData, [claims]: val })
                }
                multiple
                options={claims}
                getOptionLabel={(option) => option.claim}
                name="claims"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Claims"
                    placeholder="Claim"
                    margin="normal"
                  />
                )}
              />

              <Autocomplete
                onChange={handleChange}
                multiple
                options={values}
                getOptionLabel={(option) => option.value}
                name="values"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Values"
                    placeholder="Value"
                    margin="normal"
                  />
                )}
              />
              <div className={classes.appBarSpacer} />
              <Typography>Product Image</Typography>
              <input
                type="file"
                id="file_field"
                name="file"
                onChange={handleChange}
              />
              <div className={classes.appBarSpacer} />
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
