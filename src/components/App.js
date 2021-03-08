import { Typography, Box } from '@material-ui/core';
import StockChart from './StockChart';

const App = () => {
  return (
    <Box m={5}>
      <Typography variant='h1'>The App</Typography>
      <StockChart />
    </Box>
  );
};

export default App;
