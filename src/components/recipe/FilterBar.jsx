import React from 'react';
import { CATEGORIES, DIFFICULTIES } from '../../utils/mockData';

export default function FilterBar({ filters, onFilterChange, onResetFilters }) {
  return (
    <div style={styles.filterContainer}>
      <div style={styles.filterGroup}>
        <label style={styles.label}>Loại món</label>
        <select
          value={filters.categoryId}
          onChange={(e) => onFilterChange('categoryId', e.target.value)}
          style={styles.select}
        >
          <option value="">Tất cả loại món</option>
          {CATEGORIES.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Thời gian nấu</label>
        <select
          value={filters.maxCookTime}
          onChange={(e) => onFilterChange('maxCookTime', e.target.value)}
          style={styles.select}
        >
          <option value="">Mọi thời gian</option>
          <option value="15">Nhanh (≤ 15 phút)</option>
          <option value="30">Vừa phải (≤ 30 phút)</option>
          <option value="60">Thong thả (≤ 60 phút)</option>
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Độ khó</label>
        <select
          value={filters.difficulty}
          onChange={(e) => onFilterChange('difficulty', e.target.value)}
          style={styles.select}
        >
          <option value="">Tất cả độ khó</option>
          {DIFFICULTIES.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={onResetFilters} style={styles.resetBtn}>
        ↺ Đặt lại bộ lọc
      </button>
    </div>
  );
}

const styles = {
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    padding: '16px 20px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    marginBottom: '24px'
  },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 180px' },
  label: { fontSize: '13px', fontWeight: 600, color: '#374151' },
  select: {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer'
  },
  resetBtn: {
    padding: '9px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px'
  }
};