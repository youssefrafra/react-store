import React, { useState, useEffect, Fragment } from "react";
import {
  Paper,
  Step,
  Stepper,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

import { commerce } from "../../../lib/commerce";
import { Link  } from "react-router-dom";
// useHistory
const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();
  // const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        // console.log("Checkout mounted");
        setCheckoutToken(token);
      } catch (error) {
        // history.pushState("/");
        window.location.href = "/";
      }
    };
    // console.log("checkoutToken: ",checkoutToken)
    // console.log("Cart: ",cart)
    cart.id && generateToken();
    return () => console.log("Checkout unmounted");
  }, [cart]);

  const nextStep = () => setActiveStep((current) => current + 1);
  const backStep = () => setActiveStep((current) => current - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const Confirmation = () =>
    order.customer ? (
      <Fragment>
        <div>
          <Typography variant="h5">
            Thank you for your order, {order.customer.firstname}{" "}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home Page
        </Button>
      </Fragment>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error)
    <Fragment>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home Page
      </Button>
    </Fragment>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </Fragment>
  );
};

export default Checkout;
