import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.logo}>
          🍳 Sổ Tay Nấu Ăn
        </Link>
        <Link to="/" style={styles.link}>Khám phá</Link>
        <Link to="/search-ingredients" style={styles.link}>Tìm theo nguyên liệu</Link>

        {isAuthenticated && (
          <>
            <Link to="/meal-planner" style={styles.link}>Thực đơn tuần</Link>
            <Link to="/my-recipes" style={styles.link}>
              Công thức của tôi ({user?.favorites?.length || 0} ❤)
            </Link>
            <Link to="/recipes/create" style={styles.createBtn}>+ Đăng món mới</Link>
          </>
        )}

        {user?.role === 'admin' && (
          <Link to="/admin/approve" style={styles.adminLink}>
            Quản trị (Admin)
          </Link>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <div style={styles.userBox}>
            <span>Xin chào, <strong>{user.name}</strong> ({user.role})</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Đăng xuất</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={styles.loginBtn}>Đăng nhập</Link>
            <Link to="/register" style={styles.registerBtn}>Đăng ký</Link>
          </div>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 50
  },
  navLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
  logo: { fontWeight: 'bold', fontSize: '20px', color: '#ea580c', textDecoration: 'none' },
  link: { color: '#374151', textDecoration: 'none', fontWeight: 500 },
  createBtn: {
    padding: '6px 12px',
    backgroundColor: '#fff7ed',
    color: '#ea580c',
    border: '1px solid #fdba74',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600
  },
  adminLink: { color: '#dc2626', fontWeight: 'bold', textDecoration: 'none' },
  userBox: { display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' },
  logoutBtn: { padding: '6px 12px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' },
  loginBtn: {
    padding: '8px 16px',
    backgroundColor: '#ea580c',
    color: '#ffffff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600
  },
  registerBtn: {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600
  }
};