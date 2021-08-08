import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
// import { classExpression } from "@babel/types";
import logo from "../../assets/shoppingbag.png";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ cart }) => {
  const classes = useStyles();
  const location = useLocation();
  // console.log(location.pathname)
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" className={classes.title} color="inherit">
              <img
                src={logo}
                alt="React Store"
                height="25px"
                className={classes.image}
              />
              React Store
            </Typography>
          </Link>
          <div className={classes.grow}></div>
          <div className={classes.button}>
            {location.pathname === '/' && (<Link to="/cart">
              <IconButton aria-label="Show cart items" color="inherit">
                <Badge badgeContent={cart.total_unique_items} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>)}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
