import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const BuySellConfirmDialog = ({ open, handleClose, orderData }) => {
  const { buyOrSell, orderTotal, shareQuantity, ticker, price } = orderData;
  const [isLoading, setIsLoading] = useState(false);

  const placeOrder = async () => {
    setIsLoading(true);

    // buy order
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
      }
    } catch (error) {
      // setHasErrorSearch(true);
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
              {`You are placing a ${buyOrSell} order for ${shareQuantity} shares of ${ticker} at $${price} per share for a total of $${orderTotal}. Please confirm.`}
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

export default BuySellConfirmDialog;
