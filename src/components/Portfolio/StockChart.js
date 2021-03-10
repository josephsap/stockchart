import { Typography, Box } from '@material-ui/core';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

// format data into array of arrays like highcharts wants.
const formatDataForChart = (data) =>
  data.map((obj) => {
    const returnData = Object.keys(obj).map((key) => {
      // get rid of volume for now
      if (key === 'volume') delete obj[key];

      // date needs to be in milliseconds
      const stockItemDate = new Date(obj.date);
      obj.date = stockItemDate.getTime();
      const objKey = parseFloat(obj[key]);
      if (!isNaN(objKey % 1) && objKey !== 'undefined') {
        return objKey;
      }
    });

    // get rid of undefined values
    return returnData.filter(Boolean);
  });

const StockChart = ({ portfolioItemData }) => {
  const stockName = portfolioItemData[0].Name;
  const formattedData = formatDataForChart(portfolioItemData);

  const stockChartOptions = {
    yAxis: [
      {
        height: '75%',
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: `${stockName}`,
        },
      },
      {
        top: '75%',
        height: '25%',
        labels: {
          align: 'right',
          x: -3,
        },
        offset: 0,
      },
    ],
    series: [
      {
        data: formattedData,
        type: 'area',
        name: `${stockName} Stock Price`,
        id: 'aapl',
      },
    ],
  };

  return (
    <Box mt={4}>
      <Typography
        variant='h4'
        gutterBottom
        style={{ textAlign: 'center' }}
      >{`${stockName} stock chart`}</Typography>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType='stockChart'
        options={stockChartOptions}
      />
    </Box>
  );
};

export default StockChart;
