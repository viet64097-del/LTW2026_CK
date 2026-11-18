import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../redux/authSlice';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Mật khẩu phải từ 6 ký tự trở lên!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    const newUser = {
      _id: `u_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role: 'member',
      favorites: []
    };

    dispatch(
      loginSuccess({
        user: newUser,
        token: 'mock_jwt_token_new_member'
      })
    );
    navigate('/', { replace: true });;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Đăng ký Thành viên</h2>
      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Họ và tên</label>
        <input
          type="text"
          placeholder="Ví dụ: Nguyễn Tiến Đức"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Mật khẩu</label>
        <input
          type="password"
          placeholder="Tối thiểu 6 ký tự"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Xác nhận mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.submitBtn}>
          Tạo tài khoản
        </button>
      </form>

      <p style={styles.switchText}>
        Đã có tài khoản? <Link to="/login" style={{ color: '#ea580c', fontWeight: 600 }}>Đăng nhập</Link>
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