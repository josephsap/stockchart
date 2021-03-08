import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { DatePicker } from '@material-ui/pickers';

const Market = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2017-01-04'));

  // const handleDateChange = (e) => {
  //   console.log('hi', e.target.value);
  //   // const rr = new Date(e.target.value);
  //   // const chosenDate = format(rr, 'M-d-yyyy');
  //   // console.log(chosenDate)
  //   // setSelectedDate(chosenDate);
  //   // current: 2017-01-03
  //   // "date": "1/3/17",
  // };

  const handleDateChange = (date) => {
    console.log(date);
    const updatedDate = format(date, 'M/d/yyyy');
    setSelectedDate(updatedDate);
  };

  // useEffect(() => {
  //   // const updatedDate = format(selectedDate, 'M/d/yyyy');
  //   console.log(selectedDate, '**&&*(*&')
  // }, [selectedDate]);
  console.log(selectedDate, '999');
  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        // openTo={'2017'}
        // format="MM/DD/YYYY"
        variant='inline'
        initialFocusedDate='2017-11-31'
        maxDate={new Date('2017-12-31').toString()}
        minDate={new Date('2017-01-01').toString()}
        disableFuture
        disablePast
      />
    </div>
  );
};

export default Market;
