import React, { useState } from 'react';

const MOCK_ADMIN_REVIEWS = [
  {
    _id: 'rev_1',
    recipeTitle: 'Phở Bò Hà Nội Truyền Thống',
    userName: 'Minh Anh',
    rating: 5,
    comment: 'Nước dùng ngọt thanh, làm theo công thức này cả nhà khen ngon!',
    createdAt: '16/11/2026',
    isHidden: false
  },
  {
    _id: 'rev_2',
    recipeTitle: 'Bún Chả Hà Nội',
    userName: '8xBet',
    rating: 1,
    comment: 'Bấm vào link quảng cáo nhận thưởng miễn phí tại đây...',
    createdAt: '18/11/2026',
    isHidden: false
  },
  {
    _id: 'rev_3',
    recipeTitle: 'Cơm Chiên Dương Châu',
    userName: 'Ly',
    rating: 4,
    comment: 'Dễ làm, hạt cơm tơi. Mình thêm chút lạp xưởng ăn rất hợp.',
    createdAt: '19/11/2026',
    isHidden: false
  },
  {
    _id: 'rev_4',
    recipeTitle: 'Gà Rang Gừng',
    userName: 'User_999',
    rating: 1,
    comment: 'tệ',
    createdAt: '20/11/2026',
    isHidden: true
  }
];

export default function ManageReviewsTab() {
  const [reviews, setReviews] = useState(MOCK_ADMIN_REVIEWS);
  const [filter, setFilter] = useState('all'); // 'all' | 'visible' | 'hidden'

  const handleToggleHide = (id) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev._id === id ? { ...rev, isHidden: !rev.isHidden } : rev
      )
    );
  };

  const filteredReviews = reviews.filter((rev) => {
    if (filter === 'visible') return !rev.isHidden;
    if (filter === 'hidden') return rev.isHidden;
    return true;
  });

  const hiddenCount = reviews.filter((r) => r.isHidden).length;

  return (
    <div>
      <div style={styles.filterRow}>
        <button
          type="button"
          onClick={() => setFilter('all')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'all' ? '#ea580c' : '#f3f4f6',
            color: filter === 'all' ? '#fff' : '#374151'
          }}
        >
          Tất cả ({reviews.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('visible')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'visible' ? '#16a34a' : '#f3f4f6',
            color: filter === 'visible' ? '#fff' : '#374151'
          }}
        >
          👁️ Đang hiển thị ({reviews.length - hiddenCount})
        </button>
        <button
          type="button"
          onClick={() => setFilter('hidden')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'hidden' ? '#dc2626' : '#f3f4f6',
            color: filter === 'hidden' ? '#fff' : '#374151'
          }}
        >
          🚫 Đã ẩn ({hiddenCount})
        </button>
      </div>

      {filteredReviews.length === 0 ? (
        <div style={styles.emptyBox}>Không có bình luận nào trong mục này.</div>
      ) : (
        <div style={styles.list}>
          {filteredReviews.map((rev) => (
            <div
              key={rev._id}
              style={{
                ...styles.card,
                opacity: rev.isHidden ? 0.65 : 1,
                backgroundColor: rev.isHidden ? '#f9fafb' : '#ffffff'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={styles.topRow}>
                  <strong style={{ color: '#111827' }}>{rev.userName}</strong>
                  <span style={{ color: '#f59e0b', fontSize: '14px' }}>
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </span>
                  <span style={styles.recipeTag}>🍲 {rev.recipeTitle}</span>
                  <span style={styles.dateText}>{rev.createdAt}</span>
                </div>

                <p
                  style={{
                    ...styles.comment,
                    textDecoration: rev.isHidden ? 'line-through' : 'none'
                  }}
                >
                  {rev.comment}
                </p>

                {rev.isHidden && (
                  <span style={styles.hiddenBadge}>
                    🚫 Đã ẩn khỏi trang công thức do vi phạm
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleToggleHide(rev._id)}
                style={rev.isHidden ? styles.showBtn : styles.hideBtn}
              >
                {rev.isHidden ? '👁️ Hiện lại' : '🚫 Ẩn bình luận'}
              </button>
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
  card: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', flexWrap: 'wrap' },
  topRow: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' },
  recipeTag: { backgroundColor: '#fff7ed', color: '#ea580c', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 },
  dateText: { fontSize: '12px', color: '#9ca3af' },
  comment: { margin: '0 0 6px 0', fontSize: '14px', color: '#374151', lineHeight: '1.5' },
  hiddenBadge: { display: 'inline-block', fontSize: '12px', color: '#dc2626', fontWeight: 600 },
  hideBtn: { padding: '8px 14px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' },
  showBtn: { padding: '8px 14px', backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }
};