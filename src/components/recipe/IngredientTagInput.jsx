import React, { useState } from 'react';

const QUICK_SUGGESTIONS = ['thịt bò', 'cà chua', 'trứng gà', 'hành tây', 'khoai tây', 'tỏi', 'mì ý'];

export default function IngredientTagInput({
  selectedIngredients,
  onAddIngredient,
  onRemoveIngredient,
  onClearAll
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const cleaned = inputValue.trim().toLowerCase();
    if (!cleaned) return;
    onAddIngredient(cleaned);
    setInputValue('');
  };

  return (
    <div style={styles.box}>
      <form onSubmit={handleAdd} style={styles.formRow}>
        <input
          type="text"
          placeholder="Nhập nguyên liệu bạn đang có (ví dụ: thịt bò, cà chua, trứng gà...) rồi nhấn Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>
          + Thêm nguyên liệu
        </button>
      </form>

      <div style={styles.suggestionRow}>
        <span style={styles.suggestLabel}>Gợi ý có sẵn trong tủ lạnh:</span>
        {QUICK_SUGGESTIONS.map((item) => {
          const isSelected = selectedIngredients.includes(item);
          return (
            <button
              key={item}
              type="button"
              disabled={isSelected}
              onClick={() => onAddIngredient(item)}
              style={{
                ...styles.suggestChip,
                opacity: isSelected ? 0.45 : 1,
                cursor: isSelected ? 'default' : 'pointer'
              }}
            >
              + {item}
            </button>
          );
        })}
      </div>

      {selectedIngredients.length > 0 && (
        <div style={styles.tagsArea}>
          <div style={styles.tagsList}>
            {selectedIngredients.map((ing) => (
              <span key={ing} style={styles.tag}>
                🥗 {ing}
                <button
                  type="button"
                  onClick={() => onRemoveIngredient(ing)}
                  style={styles.removeTagBtn}
                  title="Xóa nguyên liệu này"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button type="button" onClick={onClearAll} style={styles.clearAllBtn}>
            Xóa tất cả ({selectedIngredients.length})
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  box: {
    padding: '22px',
    backgroundColor: '#ffffff',
    border: '1px solid #fed7aa',
    borderRadius: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    marginBottom: '24px'
  },
  formRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  input: {
    flex: '1 1 280px',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px'
  },
  addBtn: {
    padding: '11px 20px',
    backgroundColor: '#ea580c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px'
  },
  suggestionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
    marginTop: '14px'
  },
  suggestLabel: { fontSize: '13px', color: '#6b7280', marginRight: '4px' },
  suggestChip: {
    padding: '4px 10px',
    fontSize: '12px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    color: '#374151'
  },
  tagsArea: {
    marginTop: '18px',
    paddingTop: '14px',
    borderTop: '1px dashed #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  tagsList: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#fff7ed',
    color: '#c2410c',
    border: '1px solid #fdba74',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600
  },
  removeTagBtn: {
    border: 'none',
    background: 'transparent',
    color: '#9a3412',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0 2px'
  },
  clearAllBtn: {
    padding: '6px 12px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500
  }
};