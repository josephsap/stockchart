import { useState } from 'react';
import { Box } from '@material-ui/core';
import { formatDate } from '../../utils';
import SearchForm from './SearchForm';
import BuyQuote from './BuyQuote';

// http://localhost:3001/stockPrices?q=aapl&date=1/4/17
// this one returns data for both tickers
// http://localhost:3001/stockPrices/?Name=WYNN&Name=AAPL
// http://localhost:3001/stockPrices/?Name=WYNN&Name=AAPL&date=1/4/17

// http://localhost:3001/stockPrices/?_sort=date&_order=asc
// http://localhost:3001/stockPrices/?_sort=Name&_order=desc

const Market = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({});
  const [buySellDate, setBuySellDate] = useState(null);

  const handleSearchSubmit = async ({ tickerSearch, dateSearch }) => {
    setIsLoading(true);

    const formatted = formatDate(dateSearch);
    setBuySellDate(formatted);

    try {
      const results = await fetch(
        `http://localhost:3001/stockPrices?q=${tickerSearch}&date=${formatted}`
      );
      const resultsJSON = await results.json();
      // setSearchResults(searchResults => [...searchResults, resultsJSON[0]]);
      setSearchResults(resultsJSON[0]);
      setIsLoading(false);
    } catch (error) {
      // setHasErrorSearch(true);
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Box>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        buySellDate={buySellDate}
      />
      {Object.keys(searchResults).length > 0 && (
        <BuyQuote searchResults={searchResults} {...props} />
      )}
    </Box>
  );
};

export default Market;
