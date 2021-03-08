import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { format } from 'date-fns';
import SearchForm from './SearchForm';


// http://localhost:3001/stockPrices?q=aapl&date=1/4/17

const Market = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({});

  const handleSearchSubmit = async ({ tickerSearch, dateSearch }) => {
    setIsLoading(true);

    // date-fns format was off by one day.
    // fixing that with timezone reset.
    const dateString = new Date(dateSearch);
    const dateStringDate = new Date(dateString.valueOf() + dateString.getTimezoneOffset() * 60 * 1000);
    const formattedDate = format(dateStringDate, 'M/d/yy');

    try {
      const results = await fetch(`http://localhost:3001/stockPrices?q=${tickerSearch}&date=${formattedDate}`);
      const searchResults = await results.json();
      setSearchResults(searchResults[0]);
      setIsLoading(false);
    } catch (error) {
      // setHasErrorSearch(true);
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <SearchForm handleSearchSubmit={handleSearchSubmit} />
      {Object.keys(searchResults).length > 0 &&
        <p>Closing Price on date: {searchResults.close}</p>
      }
    </div>
  );
};

export default Market;