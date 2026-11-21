// client/src/components/mealPlan/SelectRecipeModal.jsx
import React, { useState } from 'react';
import { MOCK_RECIPES } from '../../utils/mockData';

export default function SelectRecipeModal({ dayLabel, mealLabel, onSelect, onClose }) {
  const [keyword, setKeyword] = useState('');

  const approvedRecipes = MOCK_RECIPES.filter(
    (r) =>
      r.status === 'approved' &&
      r.title.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <span style={styles.subTitle}>Chọn món ăn cho thực đơn</span>
            <h3 style={styles.title}>
              {dayLabel} — {mealLabel}
            </h3>
          </div>
          <button type="button" onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Tìm nhanh tên món ăn..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.searchInput}
          autoFocus
        />

        <div style={styles.list}>
          {approvedRecipes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0' }}>
              Không tìm thấy món ăn phù hợp.
            </p>
          ) : (
            approvedRecipes.map((recipe) => (
              <div
                key={recipe._id}
                onClick={() => onSelect(recipe)}
                style={styles.item}
              >
                <img src={recipe.thumbnail} alt={recipe.title} style={styles.thumb} />
                <div style={{ flex: 1 }}>
                  <div style={styles.itemTitle}>{recipe.title}</div>
                  <div style={styles.itemMeta}>
                    {recipe.category?.name} • ⏱ {recipe.cookTime} phút • 👥 {recipe.servings} người
                  </div>
                </div>
                <span style={styles.pickTag}>+ Chọn</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px'
  },
  modal: {
    width: '100%',
    maxWidth: '560px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' },
  subTitle: { fontSize: '12px', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase' },
  title: { margin: '4px 0 0 0', fontSize: '18px', color: '#111827' },
  closeBtn: { border: 'none', background: '#f3f4f6', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' },
  searchInput: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box' },
  list: { overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' },
  item: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '10px', border: '1px solid #e5e7eb', cursor: 'pointer', backgroundColor: '#f9fafb' },
  thumb: { width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' },
  itemTitle: { fontWeight: 700, fontSize: '15px', color: '#111827', marginBottom: '4px' },
  itemMeta: { fontSize: '12px', color: '#6b7280' },
  pickTag: { padding: '6px 12px', backgroundColor: '#fff7ed', color: '#ea580c', borderRadius: '8px', fontWeight: 600, fontSize: '13px', border: '1px solid #fdba74' }
};