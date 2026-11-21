import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import axiosClient from './api/axiosClient';
import authReducer from './redux/authSlice';

jest.mock('./api/axiosClient', () => ({ post: jest.fn() }));

const session = {
  token: 'test-session-token',
  user: { id: 'account-1', name: 'Nguyễn An', email: 'an@example.com', role: 'member' }
};

function renderPage(path) {
  window.history.replaceState(null, '', path);
  const store = configureStore({ reducer: { auth: authReducer } });
  render(<Provider store={store}><App /></Provider>);
  return store;
}

beforeEach(() => {
  axiosClient.post.mockReset();
});

test('shows the recipe home page', () => {
  renderPage('/');
  expect(screen.getByRole('heading', { name: /khám phá công thức nấu ăn mỗi ngày/i })).toBeVisible();
});

test('toggles the login password with the keyboard and keeps the typed value', () => {
  renderPage('/login');
  const password = screen.getByLabelText('Mật khẩu');
  expect(password).toHaveAttribute('type', 'password');
  fireEvent.change(password, { target: { value: 'TestPassword123' } });

  const toggle = screen.getByRole('button', { name: 'Hiện mật khẩu' });
  toggle.focus();
  userEvent.keyboard('{Enter}');
  expect(password).toHaveAttribute('type', 'text');
  expect(password).toHaveValue('TestPassword123');
  expect(screen.getByRole('button', { name: 'Ẩn mật khẩu' })).toHaveFocus();
  userEvent.keyboard('[Space]');
  expect(password).toHaveAttribute('type', 'password');
  expect(axiosClient.post).not.toHaveBeenCalled();
});

test('toggles the two registration passwords separately and catches a mismatch', () => {
  renderPage('/register');
  const password = screen.getByLabelText('Mật khẩu');
  const confirmation = screen.getByLabelText('Xác nhận mật khẩu');
  fireEvent.change(screen.getByLabelText('Họ và tên'), { target: { value: 'Nguyễn An' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'an@example.com' } });
  fireEvent.change(password, { target: { value: 'TestPassword123' } });
  fireEvent.change(confirmation, { target: { value: 'Different123' } });

  fireEvent.click(screen.getByRole('button', { name: 'Hiện xác nhận mật khẩu' }));
  expect(confirmation).toHaveAttribute('type', 'text');
  expect(confirmation).toHaveValue('Different123');
  expect(password).toHaveAttribute('type', 'password');
  fireEvent.click(screen.getByRole('button', { name: 'Hiện mật khẩu' }));
  fireEvent.click(screen.getByRole('button', { name: 'Ẩn xác nhận mật khẩu' }));
  expect(password).toHaveAttribute('type', 'text');
  expect(password).toHaveValue('TestPassword123');
  expect(confirmation).toHaveAttribute('type', 'password');

  fireEvent.click(screen.getByRole('button', { name: 'Tạo tài khoản' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Mật khẩu xác nhận không khớp.');
  expect(axiosClient.post).not.toHaveBeenCalled();
});

test('displays an invalid login error and keeps the login form available', async () => {
  axiosClient.post.mockRejectedValueOnce({
    response: { status: 401, data: { message: 'Tài khoản hoặc mật khẩu không đúng' } }
  });
  renderPage('/login');
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'an@example.com' } });
  fireEvent.change(screen.getByLabelText('Mật khẩu'), { target: { value: 'WrongPass123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Tài khoản hoặc mật khẩu không đúng');
  expect(screen.getByRole('button', { name: 'Đăng nhập' })).toBeEnabled();
});

test('returns to the requested member page after successful login', async () => {
  axiosClient.post.mockResolvedValueOnce(session);
  const store = renderPage('/my-recipes?from=home#list');
  fireEvent.change(await screen.findByLabelText('Email'), { target: { value: 'an@example.com' } });
  fireEvent.change(screen.getByLabelText('Mật khẩu'), { target: { value: 'TestPassword123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));

  expect(await screen.findByRole('heading', { name: /sổ tay cá nhân/i })).toBeVisible();
  expect(axiosClient.post).toHaveBeenCalledWith('/auth/login', {
    email: 'an@example.com',
    password: 'TestPassword123'
  }, { skipAuth: true });
  expect(window.location.search).toBe('?from=home');
  expect(window.location.hash).toBe('#list');
  expect(store.getState().auth.user._id).toBe('account-1');
});

test('creates an account with the API and signs in as the returned member', async () => {
  axiosClient.post.mockResolvedValueOnce(session);
  const store = renderPage('/register');
  fireEvent.change(screen.getByLabelText('Họ và tên'), { target: { value: ' Nguyễn An ' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'an@example.com' } });
  fireEvent.change(screen.getByLabelText('Mật khẩu'), { target: { value: 'TestPassword123' } });
  fireEvent.change(screen.getByLabelText('Xác nhận mật khẩu'), { target: { value: 'TestPassword123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Tạo tài khoản' }));

  expect(await screen.findByRole('button', { name: 'Đăng xuất' })).toBeVisible();
  expect(axiosClient.post).toHaveBeenCalledWith('/auth/register', {
    name: 'Nguyễn An',
    email: 'an@example.com',
    password: 'TestPassword123'
  }, { skipAuth: true });
  expect(store.getState().auth).toMatchObject({
    isAuthenticated: true,
    user: { _id: 'account-1', role: 'member' }
  });
});
