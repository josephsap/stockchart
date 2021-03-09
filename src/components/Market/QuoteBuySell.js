import { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BuySellConfirmDialog from '../common/buySellConfirmDialog';

const validationSchema = yup.object({
  shareQuantity: yup
    .number('Enter a number')
    .required('A quantity is required'),
  buyOrSell: yup.string('Buy or sell?'),
});

const QuoteBuySell = (props) => {
  const [buySell, setBuySell] = useState('buy');
  const [open, setOpen] = useState(false);
  const { searchResults, balance } = props;
  const [orderData, setOrderData] = useState({});

  const handleClose = (value) => {
    setOpen(value);
  };

  const handleBuySellSubmit = (values) => {
    const { shareQuantity, buyOrSell } = values;

    const orderTotal = Number(searchResults.close) * Number(shareQuantity);

    const orderInfo = {
      date: searchResults.date,
      price: searchResults.close,
      ticker: searchResults.Name,
      shareQuantity,
      buyOrSell,
      orderTotal: orderTotal.toFixed(2),
    };

    setOrderData(orderInfo);

    console.log(orderTotal, '&&&&&&', orderInfo);

    if (buyOrSell === 'buy' && orderTotal <= 200000) {
      // add it to the portfolio.
      setOpen(true);
    }

    if (buyOrSell === 'sell') {
    }
  };

  const handleBuySellChange = (e) => setBuySell(e.target.value);

  const formik = useFormik({
    initialValues: {
      shareQuantity: '',
      buyOrSell: 'buy',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleBuySellSubmit(values),
  });

  return (
    <Grid container>
      <BuySellConfirmDialog
        open={open}
        handleClose={handleClose}
        orderData={orderData}
      />
      {/* {Object.keys(searchResults).length > 0 && */}
      <Box mt={6} key={searchResults.Name}>
        <Grid item xs={12} sm={6}>
          <Typography variant='body1'>{searchResults.Name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body1'>
            Price: ${searchResults.close} per share
          </Typography>
        </Grid>
      </Box>
      {/* } */}
      <Grid item xs={12} sm={7}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id='buyOrSell'
            select
            label='Buy or sell?'
            // className={classes.textField}
            value={buySell}
            onChange={handleBuySellChange}
            margin='normal'
            fullWidth
          >
            <MenuItem value={'buy'}>Buy</MenuItem>
            <MenuItem value={'sell'}>Sell</MenuItem>
          </TextField>
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
  );
};

export default QuoteBuySell;
