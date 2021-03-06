import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdateProductQty, onRemoveFromCart }) => {
  const classes = useStyles();
  console.log(item)
  return (
    <Card className={classes.card}>
      <CardMedia
        component={Link}
        to={`/${item.product_id}`}
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name} </Typography>
        <Typography variant="h6">
          {item.line_total.formatted_with_symbol}{" "}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateProductQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateProductQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
