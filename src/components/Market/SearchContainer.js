import { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { formatDate } from '../../lib/utils';
import SearchForm from './SearchForm';
import BuyQuote from './BuyQuote';

// http://localhost:3001/stockPrices?q=aapl&date=1/4/17
// this one returns data for both tickers
// http://localhost:3001/stockPrices/?Name=WYNN&Name=AAPL
// http://localhost:3001/stockPrices/?Name=WYNN&Name=AAPL&date=1/4/17

// http://localhost:3001/stockPrices/?_sort=date&_order=asc
// http://localhost:3001/stockPrices/?_sort=Name&_order=desc

const SearchContainer = (props) => {
  const [searchResults, setSearchResults] = useState({});
  const [buySellDate, setBuySellDate] = useState(null);
  const [hasErrorSearch, setHasErrorSearch] = useState(false);

  const handleSearchSubmit = async ({ tickerSearch, dateSearch }) => {
    const formatted = formatDate(dateSearch);
    setBuySellDate(formatted);

    try {
      const results = await fetch(
        `http://localhost:3001/stockPrices?q=${tickerSearch}&date=${formatted}`
      );

      const resultsJSON = await results.json();
      console.log(resultsJSON, 'hihih');
      if (resultsJSON.length === 0) {
        setHasErrorSearch(true);
        return;
      } else {
        setSearchResults(resultsJSON[0]);
        setHasErrorSearch(false);
      }
    } catch (error) {
      setHasErrorSearch(true);
      console.error(error);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        {hasErrorSearch && (
          <Typography variant='body1'>Ticker not found!</Typography>
        )}
        <SearchForm
          handleSearchSubmit={handleSearchSubmit}
          buySellDate={buySellDate}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        {Object.keys(searchResults).length > 0 && (
          <BuyQuote searchResults={searchResults} {...props} />
        )}
      </Grid>
    </Grid>
  );
};

export default SearchContainer;
