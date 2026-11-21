import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_RECIPES } from '../../utils/mockData';

export default function TopRatedRecipesTab() {
  const topRecipes = [...MOCK_RECIPES]
    .filter((r) => r.status === 'approved')
    .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));

  const getRankBadge = (index) => {
    if (index === 0) return '🥇 #1';
    if (index === 1) return '🥈 #2';
    if (index === 2) return '🥉 #3';
    return `#${index + 1}`;
  };

  return (
    <div>
      <div style={styles.summaryRow}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Tổng công thức đã duyệt</span>
          <strong style={styles.statValue}>{topRecipes.length} món</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Điểm đánh giá cao nhất</span>
          <strong style={styles.statValue}>
            {topRecipes[0]?.avgRating || 0} / 5 ⭐
          </strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Món dẫn đầu hiện tại</span>
          <strong style={{ ...styles.statValue, fontSize: '16px', color: '#ea580c' }}>
            {topRecipes[0]?.title || 'Chưa có'}
          </strong>
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '80px' }}>Hạng</th>
              <th style={styles.th}>Công thức</th>
              <th style={styles.th}>Loại món</th>
              <th style={styles.th}>Tác giả</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Điểm trung bình</th>
            </tr>
          </thead>
          <tbody>
            {topRecipes.map((recipe, idx) => (
              <tr key={recipe._id}>
                <td style={styles.td}>
                  <strong style={{ fontSize: idx < 3 ? '16px' : '14px' }}>
                    {getRankBadge(idx)}
                  </strong>
                </td>
                <td style={styles.td}>
                  <div style={styles.recipeCell}>
                    <img
                      src={recipe.thumbnail}
                      alt={recipe.title}
                      style={styles.thumb}
                    />
                    <Link to={`/recipes/${recipe._id}`} style={styles.titleLink}>
                      {recipe.title}
                    </Link>
                  </div>
                </td>
                <td style={styles.td}>{recipe.category?.name || '—'}</td>
                <td style={styles.td}>{recipe.author?.name || 'Thành viên'}</td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <span style={styles.ratingBadge}>
                    ⭐ {recipe.avgRating || 0} / 5
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '22px' },
  statCard: { backgroundColor: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '6px' },
  statLabel: { fontSize: '13px', color: '#6b7280' },
  statValue: { fontSize: '22px', color: '#111827' },
  tableWrap: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '640px' },
  th: { padding: '12px 16px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left', fontSize: '13px', color: '#4b5563' },
  td: { padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#111827', verticalAlign: 'middle' },
  recipeCell: { display: 'flex', alignItems: 'center', gap: '12px' },
  thumb: { width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' },
  titleLink: { fontWeight: 700, color: '#111827', textDecoration: 'none' },
  ratingBadge: { backgroundColor: '#fef3c7', color: '#b45309', padding: '5px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '13px' }
};