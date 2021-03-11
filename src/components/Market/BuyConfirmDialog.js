import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { decrementByAmount } from '../../redux/reducers/balanceSlice';

const BuyConfirmDialog = ({ open, handleClose, orderData }) => {
  const { orderTotal, shareQuantity, ticker, price } = orderData;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const placeOrder = async () => {
    setIsLoading(true);

    try {
      const results = await fetch('http://localhost:3001/portfolio', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const content = await results.json();
      if (content) {
        setIsLoading(false);
        handleClose(false);
        dispatch(decrementByAmount(orderTotal));
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby='order-dialog-title'
      >
        <DialogTitle id='order-dialog-title'>Confirm Your Order</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <DialogContentText>Procesing order...</DialogContentText>
          ) : (
            <DialogContentText>
              {`You are placing a buy order for ${shareQuantity} shares of ${ticker} at $${price} per share for a total of $${orderTotal}. Please confirm.`}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => placeOrder()} color='primary' autoFocus>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

BuyConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    shareQuantity: PropTypes.string.isRequired,
    orderTotal: PropTypes.string.isRequired,
  }).isRequired,
};

export default BuyConfirmDialog;
