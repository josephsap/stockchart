import { format } from 'date-fns';

export const formatDate = (buySellDate) => {
  // date-fns format was off by one day.
  // fixing that with timezone reset.
  const dateString = new Date(buySellDate);
  const dateStringDate = new Date(
    dateString.valueOf() + dateString.getTimezoneOffset() * 60 * 1000
  );
  const formattedDate = format(dateStringDate, 'M/d/yy');
  return formattedDate;
};
