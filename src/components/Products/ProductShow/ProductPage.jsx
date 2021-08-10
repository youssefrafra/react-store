import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import { commerce } from "../../../lib/commerce";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function ProductPage({handleAddToCart}) {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  //   const [isLoading, setIsLoading] = useState(true);
  //   const cache = useRef({})
  const fetchProductById = async (productId) => {
    const product = await commerce.products.retrieve(productId);
    // setIsLoading(false);
    setProduct(product);
    console.log("product: ", product);
    // localStorage.setItem(`${product.id}`, ...product)
  };
  useEffect(() => {
    // setIsLoading(true);
    fetchProductById(id);
    // return setIsLoading(true)
  }, [id]);
  //   console.log(localStorage.getItem(product.id));

  //   if (isLoading) return <div>Loading...</div>;
  // return <div>{product.id}</div>;
  return (
    <>
      {product.id && (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <div className={classes.toolbar}></div>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            className={classes.image}
            style={{ backgroundImage: `url(${product.media.source})` }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" style={{flexGrow: 1}}>
                {product.description.match(/>(.*)</)[1]}
              </Typography>
              <div>
              <Typography component="h1" variant="h5">
                {product.price.formatted_with_symbol}
              </Typography>
              <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.add}
                  onClick={() => handleAddToCart(product.id, 1)}
                >
                  Add one to Cart
                </Button>
                </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}
