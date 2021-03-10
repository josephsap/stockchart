import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SellDialog from './SellDialog';
import { formatDate } from '../../lib/utils';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '../../redux/reducers/balanceSlice';
import { sellAllSharesOfStock } from '../../redux/reducers/portfolioSlice';

const SellDialogContainer = ({ open, handleClose, stockToSell }) => {
  const dispatch = useDispatch();
  const [sellPrice, setSellPrice] = useState(null);

  const validationSchema = yup.object({
    shareQuantity: yup
      .number('Enter a number')
      .required(
        'A quantity is required. It must be less than or equal to the amount of shares owned.'
      )
      .min(1)
      .max(
        stockToSell ? stockToSell.stock.shareQuantity : null,
        'You cannot sell more shares than you have'
      ),
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

  const handleSellSubmit = async (values) => {
    const { shareQuantity } = values;

    // updating total. using buy price * numShares
    const newTotal =
      (stockToSell.stock.shareQuantity - shareQuantity) *
      stockToSell.stock.price;

    const newShareQty = stockToSell.stock.shareQuantity - shareQuantity;
    if (isNaN(newShareQty)) {
      if (newShareQty < 0) {
        return false;
      }
    }

    try {
      const results = await fetch(
        `http://localhost:3001/portfolio/${stockToSell.stock.id}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shareQuantity: newShareQty,
            orderTotal: newTotal,
          }),
        }
      );
      const content = await results.json();
      if (content) {
        if (!isNaN(shareQuantity && shareQuantity)) {
          const proceeds = sellPrice * shareQuantity;
          dispatch(incrementByAmount(proceeds));
          handleClose(false);

          // delete item from portfolio if no shares
          if (content.shareQuantity === 0) {
            dispatch(sellAllSharesOfStock(content));
            try {
              await fetch(`http://localhost:3001/portfolio/${content.id}`, {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SellDialog
      open={open}
      handleClose={handleClose}
      stockToSell={stockToSell}
      handleSellSubmit={handleSellSubmit}
      handleGetSellPrice={handleGetSellPrice}
      formik={formik}
      sellPrice={sellPrice}
    />
  );
};

export default SellDialogContainer;
