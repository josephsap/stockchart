import PropTypes from 'prop-types';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './SearchForm.module.scss';

const validationSchema = yup.object({
  tickerSearch: yup
    .string('Enter a ticker')
    .min(1)
    .required('A ticker symbol is required'),
  dateSearch: yup.string('Enter a date'),
});

const SearchForm = ({ handleSearchSubmit, buySellDate }) => {
  const formik = useFormik({
    initialValues: {
      tickerSearch: '',
      dateSearch: '2017-01-03',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSearchSubmit(values),
  });

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6}>
        <form onSubmit={formik.handleSubmit} className={styles.formStyles}>
          <TextField
            fullWidth
            className={styles.searchInput}
            variant='outlined'
            id='tickerSearch'
            name='tickerSearch'
            label='Search Tickers'
            value={formik.values.tickerSearch}
            onChange={formik.handleChange}
            error={
              formik.touched.tickerSearch && Boolean(formik.errors.tickerSearch)
            }
            helperText={
              formik.touched.tickerSearch && formik.errors.tickerSearch
            }
          />
          {buySellDate ? (
            <Typography variant='body1'>{buySellDate}</Typography>
          ) : (
            <TextField
              className={styles.searchInput}
              variant='outlined'
              id='dateSearch'
              name='dateSearch'
              label='Date'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.dateSearch}
              onChange={formik.handleChange}
              error={
                formik.touched.dateSearch && Boolean(formik.errors.dateSearch)
              }
              helperText={
                'Pick a date after Jan. 2, and no weekends or holidays, 2017 only'
              }
            />
          )}
          <Button
            color='primary'
            variant='contained'
            type='submit'
            className={styles.searchButton}
          >
            Get the price
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

SearchForm.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
