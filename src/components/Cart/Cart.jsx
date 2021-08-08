import React, { Fragment } from "react";
import { Container, Typography, Button, Grid} from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  handleUpdateProductQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  // const isEmpty = !cart.line_items.length;

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Your Shopping Cart is Empty...
      <Link to="/" style={{ textDecoration: "none"}}> Go to product page and add to your cart </Link>
    </Typography>
  );

  const FilledCart = () => (
    <Fragment>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} onUpdateProductQty={handleUpdateProductQty} onRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to='/checkout'
          >
            Checkout
          </Button>
        </div>
      </div>
    </Fragment>
  );

  if (!cart.line_items) return <div>Loading...</div>;
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant='h3' className={classes.title} gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.line_items.length ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;
