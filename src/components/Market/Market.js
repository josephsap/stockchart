import { useState } from 'react';
import { Box } from '@material-ui/core';
import { format } from 'date-fns';
import SearchForm from './SearchForm';
import QuoteBuySell from './QuoteBuySell';

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

    // date-fns format was off by one day.
    // fixing that with timezone reset.
    const dateString = new Date(dateSearch);
    const dateStringDate = new Date(
      dateString.valueOf() + dateString.getTimezoneOffset() * 60 * 1000
    );
    const formattedDate = format(dateStringDate, 'M/d/yy');
    setBuySellDate(formattedDate);
    try {
      const results = await fetch(
        `http://localhost:3001/stockPrices?q=${tickerSearch}&date=${formattedDate}`
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
        <QuoteBuySell searchResults={searchResults} {...props} />
      )}
    </Box>
  );
};

export default Market;
