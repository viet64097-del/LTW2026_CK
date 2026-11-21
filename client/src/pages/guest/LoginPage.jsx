import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../redux/authSlice';
import axiosClient from '../../api/axiosClient';
import PasswordInput from '../../components/common/PasswordInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    try {
      const session = await axiosClient.post('/auth/login', { email: email.trim(), password }, { skipAuth: true });
      dispatch(loginSuccess(session));
      navigate(state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Chưa thể đăng nhập. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Đăng nhập Sổ Tay Nấu Ăn</h2>
      {error && <div role="alert" style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="login-email" style={styles.label}>Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <PasswordInput
          id="login-password"
          name="password"
          label="Mật khẩu"
          autoComplete="current-password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          labelStyle={styles.label}
          inputStyle={styles.input}
        />

        <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
          {isSubmitting ? 'Đang đăng nhập…' : 'Đăng nhập'}
        </button>
      </form>

      <p style={styles.switchText}>
        Chưa có tài khoản? <Link to="/register" state={state} style={{ color: '#ea580c', fontWeight: 600 }}>Đăng ký ngay</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '420px',
    margin: '48px auto',
    padding: '28px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  title: { marginTop: 0, marginBottom: '20px', textAlign: 'center', color: '#111827' },
  errorBox: { padding: '10px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontSize: '14px', fontWeight: 600, color: '#374151' },
  input: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' },
  submitBtn: {
    marginTop: '8px',
    padding: '12px',
    backgroundColor: '#ea580c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  switchText: { textAlign: 'center', fontSize: '14px', marginTop: '16px', color: '#4b5563' }
};
