import React, { useEffect, useState } from "react";
import Form from "../../Layout/Form";
import Grid from "@mui/material/Grid2";
import { Input, Button, Select } from "../../Controls";
import { ButtonGroup, InputAdornment, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Button as MuiButton } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Reorder } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from "../../Layout/Popup";
import ListOfOrders from "./ListOfOrders";

const pMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const buttonbgcolor = grey[700];

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
  "& .MuiTypography-root": {
    color: "#f3b33d",
    fontWeight: "bolder",
    fontSize: "1.5em",
  },
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  backgroundColor: "#f3b33d", // Group background color
  margin: theme.spacing(1),
  "& .MuiButton-root": {
    color: "black", // Set text color of the button to black
    "&:hover": {
      backgroundColor: "#ffb84d", // Optional: add hover effect for buttons
      color: "black", // Ensure text stays black on hover
    },
  },
  "& .MuiButton-label": {
    textTransform: "none", // Remove text transform (uppercase) on button labels
  },
  "&:hover": {
    backgroundColor: "#f3b33d", // Hover effect for the group itself
  },
}));

const OrderForm = (props) => {
  const {
    resetFormControls,
    values,
    handleInputChange,
    setValues,
    errors,
    setErrors,
  } = props;

  const [customerList, setCustomerList] = useState([]);

  const [Loading, setLoading] = useState(true);

  const [orderListVisibility, setOrderListVisibility] = useState(false);

  const [orderId, setOrderId] = useState(0);

  // Fetch customer list asynchronously
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll();
        let customerList = res.data.map((item) => ({
          id: item.customerID,
          title: item.customerName,
        }));

        // Add default option
        customerList = [{ id: 0, title: "Select" }].concat(customerList);

        // Update state
        setCustomerList(customerList);
        setLoading(false); // Data fetching is complete
      } catch (err) {
        console.error(err);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchCustomers();
  }, []);

  // Updating grand total field with each new order or additional quantity
  // we used JSON.stringify because useEffect wont be triggered if we just pass
  // values.orderDetails because orderDetails is a nested property of values state object

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice;
    }, 0); // 0 here initializes tempTotal parameter to 0

    setValues({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal),
    });
  }, [JSON.stringify(values.orderDetails)]);

  useEffect(() => {
    if (orderId == 0) resetFormControls();
    else {
      createAPIEndpoint(ENDPOINTS.ORDER)
        .fetchById(orderId)
        .then((res) => {
          console.log(res.data);
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  // function for validating form
  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId != 0 ? "" : "This Field Is Required";
    temp.pMethod = values.pMethod != "none" ? "" : "This Field Is Required";
    temp.orderDetails =
      values.orderDetails.length != 0 ? "" : "This Field Is Required";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === ""); // Object.values returns a collection of all values inside temp
  };
  // and every method iterates all values to check whether all return "" or not and returns true or false

  // function for submitting order
  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values);
      createAPIEndpoint(ENDPOINTS.ORDER)
        .create(values)
        .then((res) => resetFormControls())
        .catch((err) => console.log(err));
    }
  };

  // Show a loading message while data is being fetched
  if (Loading) {
    return <h1>Loading...</h1>; // Replace with a proper loading spinner if needed
  }

  const openListOfOrders = () => {
    setOrderListVisibility(true);
  };

  return (
    <>
      <Form onSubmit={submitOrder}>
        <Grid container>
          <Grid size={6}>
            <Input
              disabled
              label="Order Number"
              name="orderNumber"
              value={values.orderNumber}
              InputProps={{
                startAdornment: (
                  <StyledInputAdornment position="start">
                    <Typography>#</Typography>
                  </StyledInputAdornment>
                ),
              }}
            />
            <Select
              label="Customer"
              name="customerId"
              value={values.customerId}
              onChange={handleInputChange}
              options={customerList}
              error={errors.customerId}
            />
          </Grid>

          <Grid size={6}>
            <Select
              label="Payment Method"
              name="pMethod"
              onChange={handleInputChange}
              value={values.pMethod}
              options={pMethods}
              error={errors.pMethod}
            />
            <Input
              InputProps={{
                startAdornment: (
                  <StyledInputAdornment position="start">
                    <Typography>$</Typography>
                  </StyledInputAdornment>
                ),
              }}
              disabled
              label="Grand Total"
              value={values.gTotal}
              name="gTotal"
            />
            <StyledButtonGroup>
              <MuiButton
                size="large"
                endIcon={<RestaurantMenuIcon />}
                type="submit"
                color="primary"
              >
                Submit
              </MuiButton>

              <MuiButton size="small" startIcon={<RefreshIcon />}></MuiButton>
            </StyledButtonGroup>

            <Button
              size="large"
              startIcon={<Reorder />}
              color="warning"
              onClick={openListOfOrders}
            >
              Orders
            </Button>
          </Grid>
        </Grid>
      </Form>

      <Popup
        title="List Of Orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
        children={<ListOfOrders {...{ setOrderId, setOrderListVisibility }} />}
      ></Popup>
    </>
  );
};

export default OrderForm;
