import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    background: "rgb(92, 93, 93)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  submitButton: {
    background: "rgb(229, 103, 27)",
    color: "white",
  },
  clearButton: {
    background: "red",
    color: "white",
  },
  TextField: {
    background: "white",
  },
}));

const AddData = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    slNo: `${Math.round(Math.random() * 100000000)}`,
    customerOrderID: "",
    salesOrg: "",
    distributionChannel: "",
    division: "",
    releasedCreditValue: "0.0",
    purchaseOrderType: "",
    companyCode: "",
    orderCreationDate: "",
    orderCreationTime: "",
    creditControlArea: "",
    soldToParty: "0",
    orderAmount: "0",
    requestedDeliveryDate: "",
    orderCurrency: "",
    creditStatus: "",
    customerNumber: "",
    amountInUSD: "",
    uniqueCustID: "00",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    await axios({
        method: "post",
        url: "http://localhost:8080/hrc_milestone11/add",
        data: formData,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          console.log("Success ========>", response);
        })
        .catch((error) => {
          console.log("Error ========>", error);
        })
        .finally(() => {
          handleClearData();
        });
  };

  const handleClearData = () => {
    setFormData({
      sl_No: "",
      customerOrderID: "",
      salesOrg: "",
      distributionChannel: "",
      division: "",
      releasedCreditValue: "",
      purchaseOrderType: "",
      companyCode: "",
      orderCreationDate: "",
      orderCreationTime: "",
      creditControlArea: "",
      soldToParty: "",
      orderAmount: "",
      requestedDeliveryDate: "",
      orderCurrency: "",
      creditStatus: "",
      customerNumber: "",
      amountInUSD: "",
      uniqueCustID: "",
    });
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className={classes.formContainer}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Customer Order ID"
              name="customerOrderID"
              value={formData.customerOrderID}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Sales ORG"
              name="salesOrg"
              value={formData.salesOrg}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Distribution Channel"
              name="distributionChannel"
              value={formData.distributionChannel}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Customer Number"
                  name="customerNumber"
                  value={formData.customerNumber}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Company Code"
                  name="companyCode"
                  value={formData.companyCode}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Order Currency"
                  name="orderCurrency"
                  value={formData.orderCurrency}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Amount in USD"
                  name="amountInUSD"
                  value={formData.amountInUSD}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Order Creation Date"
                  type="date"
                  name="orderCreationDate"
                  value={formData.orderCreationDate}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  type="submit"
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  className={classes.clearButton}
                  onClick={handleClearData}
                  fullWidth
                >
                  Clear Data
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddData;