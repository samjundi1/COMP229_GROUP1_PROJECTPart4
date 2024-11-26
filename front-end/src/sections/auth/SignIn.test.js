import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';
import router from '../../../../server/routes/Auth'

test('renders sign-in form', () => {
  render(<SignIn />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('allows the user to sign in', async () => {
  render(<SignIn />);
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/sign in/i));
  // Add assertions to check if the sign-in was successful
});
