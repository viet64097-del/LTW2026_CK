import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const INITIAL_REVIEWS = [
  {
    _id: 'rev1',
    userId: 'u_demo_1',
    userName: 'Minh Anh',
    rating: 5,
    comment: 'Công thức chuẩn vị, mình làm theo đúng định lượng cả nhà khen ngon!',
    createdAt: '16/11/2026'
  },
  {
    _id: 'rev2',
    userId: 'u_demo_2',
    userName: 'Hoàng Nam',
    rating: 4,
    comment: 'Dễ làm, có điều mình giảm bớt chút đường cho hợp khẩu vị.',
    createdAt: '17/11/2026'
  }
];

export default function ReviewSection({ recipeId }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const hasReviewed = isAuthenticated && reviews.some((r) => r.userId === user?._id);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasReviewed) {
      setError('Bạn đã đánh giá công thức này rồi!');
      return;
    }
    if (!comment.trim()) {
      setError('Vui lòng nhập nội dung nhận xét của bạn.');
      return;
    }

    const newReview = {
      _id: `rev_${Date.now()}`,
      recipeId,
      userId: user._id,
      userName: user.name,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setReviews((prev) => [newReview, ...prev]);
    setComment('');
    setError('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>⭐ Đánh giá & Bình luận ({reviews.length})</h2>
        <span style={styles.avgBadge}>Điểm trung bình: {avgRating} / 5 ⭐</span>
      </div>

      {!isAuthenticated ? (
        <div style={styles.noticeBox}>
          Vui lòng <Link to="/login" style={{ color: '#ea580c', fontWeight: 600 }}>đăng nhập</Link> để gửi đánh giá cho công thức này.
        </div>
      ) : hasReviewed ? (
        <div style={styles.reviewedNotice}>
          ✓ Bạn đã gửi đánh giá cho công thức này (Mỗi tài khoản chỉ được đánh giá 1 lần).
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.starRow}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Chọn số sao:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  ...styles.starBtn,
                  color: star <= rating ? '#f59e0b' : '#d1d5db'
                }}
              >
                ★
              </button>
            ))}
            <span style={{ fontSize: '14px', color: '#4b5563' }}>({rating} sao)</span>
          </div>

          <textarea
            rows={3}
            placeholder="Chia sẻ cảm nhận của bạn sau khi nấu thử món này..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.textarea}
          />

          {error && <p style={{ color: '#dc2626', fontSize: '13px', margin: '0 0 10px 0' }}>{error}</p>}

          <button type="submit" style={styles.submitBtn}>
            Gửi đánh giá
          </button>
        </form>
      )}

      <div style={styles.list}>
        {reviews.map((rev) => (
          <div key={rev._id} style={styles.reviewItem}>
            <div style={styles.reviewTop}>
              <strong>{rev.userName}</strong>
              <span style={{ color: '#f59e0b', fontSize: '14px' }}>
                {'★'.repeat(rev.rating)}
                {'☆'.repeat(5 - rev.rating)}
              </span>
            </div>
            <p style={styles.commentText}>{rev.comment}</p>
            <span style={styles.dateText}>{rev.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { marginTop: '28px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' },
  avgBadge: { background: '#fef3c7', color: '#b45309', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '14px' },
  noticeBox: { padding: '14px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '14px', color: '#4b5563', marginBottom: '18px' },
  reviewedNotice: { padding: '12px 14px', backgroundColor: '#ecfdf5', color: '#047857', borderRadius: '8px', fontSize: '14px', fontWeight: 500, marginBottom: '18px' },
  form: { marginBottom: '22px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' },
  starRow: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' },
  starBtn: { background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', padding: '0 2px', lineHeight: 1 },
  textarea: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box', fontFamily: 'inherit' },
  submitBtn: { padding: '9px 18px', backgroundColor: '#ea580c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  list: { display: 'flex', flexDirection: 'column', gap: '14px' },
  reviewItem: { padding: '14px', backgroundColor: '#f9fafb', borderRadius: '10px', border: '1px solid #f3f4f6' },
  reviewTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  commentText: { margin: '0 0 6px 0', fontSize: '14px', color: '#374151', lineHeight: '1.5' },
  dateText: { fontSize: '12px', color: '#9ca3af' }
};