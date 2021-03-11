import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import styles from './SellDialog.module.scss';

const SellDialog = ({
  open,
  handleClose,
  stockToSell,
  formik,
  handleSellSubmit,
  handleGetSellPrice,
  sellPrice,
}) => (
  <>
    {stockToSell && (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='sell-dialog-title'
      >
        <DialogTitle id='sell-dialog-title'>Sell Shares</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {stockToSell.stock.ticker}: {stockToSell.stock.shareQuantity} shares
            owned
          </DialogContentText>
          <form
            onSubmit={formik.handleSubmit}
            className={styles.sellDialogForm}
          >
            <TextField
              className={styles.shareInput}
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
              className={styles.dateSearch}
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
              <Button onClick={handleClose} variant='contained' color='primary'>
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
    )}
  </>
);

SellDialog.defaultProps = {
  stockToSell: null,
  sellPrice: null,
};

SellDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  stockToSell: PropTypes.object,
  formik: PropTypes.object.isRequired,
  handleSellSubmit: PropTypes.func.isRequired,
  handleGetSellPrice: PropTypes.func.isRequired,
  sellPrice: PropTypes.string,
};

export default SellDialog;
