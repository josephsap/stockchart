import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import StockChart from '../StockChart';

const Portfolio = () => {
  const [balance, setBalance] = useState(100000);
  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioItemData, setPortfolioItemData] = useState([]);

  const handlePortfolioItemClick = (tickerName) => {
    (async () => {
      console.log(tickerName, 'ralrkjewkljl');
      try {
        const stockData = await fetch(
          `http://localhost:3001/stockPrices?q=${tickerName}`
        );
        const stockDataJson = await stockData.json();
        console.log(stockDataJson, '*(*(');
        setPortfolioItemData(stockDataJson);
        // populate a dropdown with the list of stocks in the portfolio
        // user can select one from their portfolio
        // and it will show a chart.
        // the chart will fetch data for the year (starting on the date)
        // and plot it.
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
        console.log(portfolioJson, '*(*(');
        // populate a dropdown with the list of stocks in the portfolio
        // user can select one from their portfolio
        // and it will show a chart.
        // the chart will fetch data for the year (starting on the date)
        // and plot it.

        setPortfolioData(portfolioJson);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <Typography variant='h2' gutterBottom>
        Your Portfolio
      </Typography>
      <Typography variant='h3' gutterBottom>{`Balance: ${balance}`}</Typography>
      <Grid container>
        <Grid item xs={12} md={3}>
          {portfolioData.map((stock) => (
            <Box
              mt={3}
              className='portfolioItem'
              key={stock.id}
              onClick={() => handlePortfolioItemClick(stock.ticker)}
            >
              <Typography variant='body1'>
                {stock.ticker}: {stock.shareQuantity}{' '}
                {stock.shareQuantity > 1 ? 'shares' : 'share'}
              </Typography>
              <Typography variant='body1'>
                Purchase price per share: ${stock.price}
              </Typography>
              <Typography variant='body1'>
                Total: ${stock.orderTotal}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={9}>
          {portfolioItemData.length > 0 ? (
            <StockChart portfolioItemData={portfolioItemData} />
          ) : (
            <Typography variant='body1'>
              Click a portfolio item to see the chart data.
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Portfolio;
