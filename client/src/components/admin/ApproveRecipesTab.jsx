import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_RECIPES } from '../../utils/mockData';

const EXTRA_PENDING = [
  {
    _id: 'rec_pending_1',
    title: 'Bánh flan caramel mềm mịn',
    category: { _id: 'cat4', name: 'Tráng miệng' },
    author: { _id: 'u_demo_3', name: 'Trần Minh Quân' },
    cookTime: 45,
    difficulty: 'Trung bình',
    status: 'pending',
    thumbnail: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600'
  },
  {
    _id: 'rec_pending_2',
    title: 'Canh chua cá lóc miền Tây',
    category: { _id: 'cat2', name: 'Món canh' },
    author: { _id: 'u_demo_4', name: 'Lê Thảo Vy' },
    cookTime: 35,
    difficulty: 'Dễ',
    status: 'pending',
    thumbnail: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600'
  }
];

export default function ApproveRecipesTab() {
  const [recipes, setRecipes] = useState([...EXTRA_PENDING, ...MOCK_RECIPES]);
  const [filterStatus, setFilterStatus] = useState('pending'); // 'pending' | 'approved' | 'rejected'

  const handleUpdateStatus = (id, newStatus) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredList = recipes.filter((r) => r.status === filterStatus);
  const pendingCount = recipes.filter((r) => r.status === 'pending').length;

  return (
    <div>
      <div style={styles.filterRow}>
        <button
          type="button"
          onClick={() => setFilterStatus('pending')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filterStatus === 'pending' ? '#ea580c' : '#f3f4f6',
            color: filterStatus === 'pending' ? '#fff' : '#374151'
          }}
        >
          ⏳ Chờ duyệt ({pendingCount})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('approved')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filterStatus === 'approved' ? '#16a34a' : '#f3f4f6',
            color: filterStatus === 'approved' ? '#fff' : '#374151'
          }}
        >
          ✓ Đã duyệt
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('rejected')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filterStatus === 'rejected' ? '#dc2626' : '#f3f4f6',
            color: filterStatus === 'rejected' ? '#fff' : '#374151'
          }}
        >
          ✕ Đã từ chối
        </button>
      </div>

      {filteredList.length === 0 ? (
        <div style={styles.emptyBox}>Không có công thức nào ở trạng thái này.</div>
      ) : (
        <div style={styles.list}>
          {filteredList.map((recipe) => (
            <div key={recipe._id} style={styles.card}>
              <img src={recipe.thumbnail} alt={recipe.title} style={styles.thumb} />
              <div style={{ flex: 1 }}>
                <h3 style={styles.title}>
                  <Link to={`/recipes/${recipe._id}`} style={styles.link}>
                    {recipe.title}
                  </Link>
                </h3>
                <div style={styles.meta}>
                  <span>📂 {recipe.category?.name || 'Chưa phân loại'}</span>
                  <span>👤 {recipe.author?.name || 'Thành viên'}</span>
                  <span>⏱ {recipe.cookTime} phút</span>
                  <span>📊 {recipe.difficulty}</span>
                </div>
              </div>

              <div style={styles.actions}>
                {recipe.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(recipe._id, 'approved')}
                    style={styles.approveBtn}
                  >
                    ✓ Duyệt bài
                  </button>
                )}
                {recipe.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(recipe._id, 'rejected')}
                    style={styles.rejectBtn}
                  >
                    ✕ Từ chối
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  filterRow: { display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' },
  filterBtn: { padding: '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  emptyBox: { textAlign: 'center', padding: '40px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db', color: '#6b7280' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', flexWrap: 'wrap' },
  thumb: { width: '80px', height: '64px', borderRadius: '8px', objectFit: 'cover' },
  title: { margin: '0 0 6px 0', fontSize: '16px' },
  link: { color: '#111827', textDecoration: 'none' },
  meta: { display: 'flex', gap: '14px', fontSize: '13px', color: '#6b7280', flexWrap: 'wrap' },
  actions: { display: 'flex', gap: '8px' },
  approveBtn: { padding: '8px 14px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  rejectBtn: { padding: '8px 14px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }
};