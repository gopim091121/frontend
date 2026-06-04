import { render, screen } from '@testing-library/react';
import App from './App';

test('renders authentication app', () => {
  render(<App />);
  expect(screen.getByText(/Modern Authentication System/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Register User/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^Login$/i })).toBeInTheDocument();
});
