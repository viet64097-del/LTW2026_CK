import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const getNavLinkStyle = ({ isActive }) => ({
    color: isActive ? '#ea580c' : '#374151',
    fontWeight: isActive ? '700' : '500',
    borderBottom: isActive ? '2px solid #ea580c' : '2px solid transparent',
    paddingBottom: '4px',
    textDecoration: 'none'
  });

  return (
    <header style={styles.header}>
      <nav style={styles.navLinks}>
        <Link to="/" style={styles.logo}>
          🍳 Sổ Tay Nấu Ăn
        </Link>
        <NavLink to="/" end style={getNavLinkStyle}>
          Khám phá
        </NavLink>
        <NavLink to="/search-ingredients" style={getNavLinkStyle}>
          Tìm theo nguyên liệu
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/meal-planner" style={getNavLinkStyle}>
              Thực đơn tuần
            </NavLink>
            <NavLink to="/my-recipes" style={getNavLinkStyle}>
              Công thức của tôi ({user?.favorites?.length || 0} ❤)
            </NavLink>
            <NavLink to="/recipes/create" style={styles.createBtn}>
              + Đăng món mới
            </NavLink>
          </>
        )}

        {user?.role === 'admin' && (
          <NavLink to="/admin/approve" style={getNavLinkStyle}>
            🛡 Quản trị (Admin)
          </NavLink>
        )}
      </nav>

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
  createBtn: {
    padding: '6px 12px',
    backgroundColor: '#fff7ed',
    color: '#ea580c',
    border: '1px solid #fdba74',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600
  },
  userBox: { display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' },
  logoutBtn: { padding: '6px 12px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' },
  loginBtn: { padding: '8px 16px', backgroundColor: '#ea580c', color: '#ffffff', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 },
  registerBtn: { padding: '8px 16px', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }
};