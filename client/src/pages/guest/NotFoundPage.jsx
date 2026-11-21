import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Không tìm thấy trang này</h2>
      <p style={styles.desc}>
        Đường dẫn bạn truy cập không tồn tại hoặc công thức đã bị xóa.
      </p>
      <Link to="/" style={styles.homeBtn}>
        ← Quay về Trang chủ
      </Link>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '80px 20px' },
  code: { fontSize: '72px', margin: '0 0 8px 0', color: '#ea580c' },
  title: { fontSize: '24px', margin: '0 0 10px 0', color: '#111827' },
  desc: { color: '#6b7280', marginBottom: '24px', fontSize: '15px' },
  homeBtn: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#ea580c',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 600
  }
};