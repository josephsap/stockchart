import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders test text', () => {
  render(<App />);
  const appText = screen.getByText('The App');
  expect(appText).toBeInTheDocument();
});
