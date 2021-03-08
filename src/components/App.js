import { Typography, Box } from '@material-ui/core';
import StockChart from './StockChart';
import Account from './Account/Account';
import Market from './Market/Market';

const App = () => {
  return (
    <Box m={5}>
      <Typography variant='h1'>The App</Typography>
      <Market />
      {/* <Account /> */}
      {/* <StockChart /> */}
    </Box>
  );
};

export default App;
