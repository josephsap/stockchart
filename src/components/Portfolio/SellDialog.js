import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '../../redux/reducers/balanceSlice';
import { formatDate } from '../../utils';

const SellDialog = ({ open, handleClose, stockToSell }) => {
  const [sellPrice, setSellPrice] = useState(null);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    shareQuantity: yup
      .number('Enter a number')
      .required(
        'A quantity is required. It must be less than or equal to the amount of shares owned.'
      )
      .min(1)
      .max(stockToSell ? stockToSell.stock.shareQuantity : null),
    dateSearch: yup.string('Enter a date to sell').required(),
  });

  const formik = useFormik({
    initialValues: {
      shareQuantity: '',
      dateSearch: stockToSell ? stockToSell.stock.date : '2017-01-03',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSellSubmit(values),
  });

  const handleSellSubmit = async (values) => {
    const { shareQuantity } = values;
    console.log(values.shareQuantity, 'valsss', shareQuantity);

    // updating total. using buy price * numShares
    const newTotal =
      (stockToSell.stock.shareQuantity - shareQuantity) *
      stockToSell.stock.price;

    try {
      const results = await fetch(
        `http://localhost:3001/portfolio/${stockToSell.stock.id}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shareQuantity, orderTotal: newTotal }),
        }
      );
      const content = await results.json();
      if (content) {
        if (!isNaN(shareQuantity && shareQuantity)) {
          const proceeds = sellPrice * shareQuantity;
          dispatch(incrementByAmount(proceeds));
          handleClose(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetSellPrice = async (e) => {
    const sellDate = formatDate(e.target.value);

    try {
      const stockOnDate = await fetch(
        `http://localhost:3001/stockPrices?q=${stockToSell.stock.ticker}&date=${sellDate}`
      );
      const stockOnDateJSON = await stockOnDate.json();
      setSellPrice(stockOnDateJSON[0].close);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {stockToSell ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='sell-dialog-title'
        >
          <DialogTitle id='sell-dialog-title'>Sell Shares</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {stockToSell.stock.ticker}: {stockToSell.stock.shareQuantity}{' '}
              shares owned
            </DialogContentText>
            <form onSubmit={formik.handleSubmit}>
              <TextField
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
              <TextField
                variant='outlined'
                id='dateSearch'
                name='dateSearch'
                label='Date'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.dateSearch}
                onChange={(e) => {
                  formik.handleChange('dateSearch')(e);
                  handleGetSellPrice(e);
                }}
                error={
                  formik.touched.dateSearch && Boolean(formik.errors.dateSearch)
                }
                helperText={
                  'Pick a date after Jan. 2, and no weekends or holidays, 2017 only'
                }
              />
              {sellPrice && (
                <DialogContentText>
                  Sell price per share: {sellPrice}
                </DialogContentText>
              )}

              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant='contained'
                  color='primary'
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSellSubmit}
                  variant='contained'
                  color='primary'
                  type='submit'
                >
                  Sell
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default SellDialog;
