import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithProvider, screen } from '../test-support/TestProvider';
import SearchForm from '../components/Market/SearchForm';

const mockHandleSearchSubmit = jest.fn();

let component;

beforeEach(() => {
  component = (
    <SearchForm
      handleSearchSubmit={mockHandleSearchSubmit}
      buySellDate={'1/10/17'}
    />
  );
});

describe('<SearchForm />', () => {
  test('It should render the search input and get price button', () => {
    const { getByTestId, getByText } = renderWithProvider(component);
    const searchForm = getByTestId('searchStocksForm');
    const submitBtn = getByText(/Get the price/);
    expect(searchForm).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('If form submit is clicked with no input, it throws an error', async () => {
    const { getByText } = renderWithProvider(component);
    const submitButton = getByText(/Get the price/);
    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorMessage = screen.getByText('A ticker symbol is required');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('Form submits successfully', async () => {
    const { getByText, getByLabelText, getByTestId } = renderWithProvider(
      component
    );
    const input = getByLabelText(/Search Tickers/);
    const submitButton = getByText(/Get the price/);
    const buyDate = getByTestId('buyDate');
    fireEvent.change(input, { target: { value: 'AAPL' } });
    expect(input.value).toBe('AAPL');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockHandleSearchSubmit).toHaveBeenCalled();
      expect(buyDate).toBeInTheDocument();
    });
  });
});
