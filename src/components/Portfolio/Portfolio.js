import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StockChart from './StockChart';
import SellDialogContainer from './SellDialogContainer';
import styles from './Portfolio.module.scss';
import {
  setPortfolio,
  selectPortfolio,
} from '../../redux/reducers/portfolioSlice';

const Portfolio = () => {
  const balance = useSelector((state) => state.balance.value);
  const [portfolioItemData, setPortfolioItemData] = useState([]);
  const [open, setOpen] = useState(false);
  const [stockToSell, setStockToSell] = useState(null);
  const dispatch = useDispatch();
  const portfolioData = useSelector(selectPortfolio);

  const handleSell = (stock) => {
    setOpen(true);
    setStockToSell(stock);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePortfolioItemClick = (e, tickerName) => {
    e.stopPropagation();
    (async () => {
      try {
        const stockData = await fetch(
          `http://localhost:3001/stockPrices?q=${tickerName}`
        );
        const stockDataJson = await stockData.json();
        setPortfolioItemData(stockDataJson);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const portfolio = await fetch('http://localhost:3001/portfolio');
        const portfolioJson = await portfolio.json();
        dispatch(setPortfolio(portfolioJson));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <Typography variant='h2' gutterBottom>
        Your Portfolio
      </Typography>
      <Typography variant='h4' gutterBottom>{`Balance: $${balance.toFixed(
        2
      )}`}</Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          {portfolioData.length > 0 ? (
            portfolioData.map((stock) => (
              <Box
                mt={5}
                mb={4}
                key={stock.id}
                className={styles.portfolioItem}
              >
                <Box
                  mt={3}
                  mb={2}
                  className={styles.portfolioClickable}
                  onClick={(e) => handlePortfolioItemClick(e, stock.ticker)}
                >
                  <Typography variant='body1' gutterBottom>
                    <b>{stock.ticker}</b>: {stock.shareQuantity}{' '}
                    {stock.shareQuantity > 1 ? 'shares' : 'share'}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    <b>Purchase price per share:</b> ${stock.price}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    <b>Total:</b> ${stock.orderTotal}
                  </Typography>
                </Box>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleSell({ stock })}
                >
                  Sell
                </Button>
              </Box>
            ))
          ) : (
            <Typography variant='body1'>
              Your portfolio is empty.{' '}
              <Link to='/'>Go to the buy/get quote page to get started.</Link>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          {portfolioItemData.length > 0 ? (
            <StockChart portfolioItemData={portfolioItemData} />
          ) : (
            <>
              {portfolioData.length > 0 && (
                <Typography variant='body1' style={{ textAlign: 'center' }}>
                  Click a portfolio item to see the chart data.
                </Typography>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <SellDialogContainer
        open={open}
        handleClose={handleClose}
        stockToSell={stockToSell}
      />
    </div>
  );
};

export default Portfolio;
