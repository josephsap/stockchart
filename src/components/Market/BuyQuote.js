import { useState } from 'react';
import { Typography, Box, Grid, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BuyConfirmDialog from '../common/BuyConfirmDialog';
import { useSelector } from 'react-redux';

const validationSchema = yup.object({
  shareQuantity: yup
    .number('Enter a number')
    .required('A quantity is required'),
});

const BuyQuote = (props) => {
  const [open, setOpen] = useState(false);
  const { searchResults } = props;
  const [orderData, setOrderData] = useState({});

  const balance = useSelector((state) => state.balance.value);

  const handleClose = (value) => {
    setOpen(value);
  };

  const handleBuySellSubmit = (values) => {
    const { shareQuantity } = values;
    const orderTotal = Number(searchResults.close) * Number(shareQuantity);

    const orderInfo = {
      date: searchResults.date,
      price: searchResults.close,
      ticker: searchResults.Name,
      shareQuantity,
      orderTotal: orderTotal.toFixed(2),
    };

    setOrderData(orderInfo);

    if (orderTotal >= balance) {
      // add it to the portfolio if you can afford it
      alert('You do not have enough money');
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      shareQuantity: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleBuySellSubmit(values),
  });

  return (
    <Box mt={5}>
      <Grid container>
        <BuyConfirmDialog
          open={open}
          handleClose={handleClose}
          orderData={orderData}
        />
        <Grid item xs={12} md={4}>
          <Typography variant='body1'>
            Your account balance: {balance}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='body1'>{searchResults.Name}</Typography>
          <Typography variant='body1'>
            Price: ${searchResults.close} per share
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              // className={styles.searchInput}
              variant='outlined'
              id='shareQuantity'
              name='shareQuantity'
              label='Number of shares'
              value={formik.values.shareQuantity}
              onChange={formik.handleChange}
              error={
                formik.touched.shareQuantity &&
                Boolean(formik.errors.shareQuantity)
              }
              helperText={
                formik.touched.shareQuantity && formik.errors.shareQuantity
              }
            />
            <Button color='primary' variant='contained' type='submit'>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuyQuote;
