import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../redux/authSlice';
import { MOCK_USERS } from '../../utils/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('member@recipe.vn');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuickLogin = (roleKey) => {
    const selectedUser = MOCK_USERS[roleKey];
    dispatch(
      loginSuccess({
        user: selectedUser,
        token: `mock_jwt_token_${selectedUser.role}`
      })
    );
    navigate('/', { replace: true });;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (email.toLowerCase().includes('admin')) {
      handleQuickLogin('admin');
    } else {
      handleQuickLogin('member');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Đăng nhập Sổ Tay Nấu Ăn</h2>
      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.submitBtn}>
          Đăng nhập
        </button>
      </form>

      <p style={styles.switchText}>
        Chưa có tài khoản? <Link to="/register" style={{ color: '#ea580c', fontWeight: 600 }}>Đăng ký ngay</Link>
      </p>

      <div style={styles.quickBox}>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b7280' }}>
          ⚡ Đăng nhập nhanh để test phân quyền (Mock Auth):
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => handleQuickLogin('member')} style={styles.quickBtn}>
            👤 Vào quyền Thành viên
          </button>
          <button type="button" onClick={() => handleQuickLogin('admin')} style={styles.quickAdminBtn}>
            🛡 Vào quyền Admin
          </button>
        </div>
      </div>
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
  switchText: { textAlign: 'center', fontSize: '14px', marginTop: '16px', color: '#4b5563' },
  quickBox: { marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #e5e7eb' },
  quickBtn: { flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer', fontSize: '13px' },
  quickAdminBtn: { flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #fca5a5', background: '#fef2f2', color: '#b91c1c', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }
};