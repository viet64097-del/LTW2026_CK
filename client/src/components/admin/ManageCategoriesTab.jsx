import React, { useState } from 'react';
import { CATEGORIES } from '../../utils/mockData';

export default function ManageCategoriesTab() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;

    const isDuplicate = categories.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      alert('Loại món này đã tồn tại!');
      return;
    }

    setCategories((prev) => [
      ...prev,
      { _id: `cat_${Date.now()}`, name: trimmed }
    ]);
    setNewName('');
  };

  const handleStartEdit = (cat) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
  };

  const handleSaveEdit = (id) => {
    const trimmed = editingName.trim();
    if (!trimmed) return;

    setCategories((prev) =>
      prev.map((c) => (c._id === id ? { ...c, name: trimmed } : c))
    );
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (cat) => {
    if (window.confirm(`Bạn có chắc muốn xóa loại món "${cat.name}"?`)) {
      setCategories((prev) => prev.filter((c) => c._id !== cat._id));
    }
  };

  return (
    <div>
      {/* Form thêm loại món mới */}
      <form onSubmit={handleAdd} style={styles.addForm}>
        <input
          type="text"
          placeholder="Nhập tên loại món mới (vd: Đồ uống, Món chay...)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>
          + Thêm loại món
        </button>
      </form>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '70px' }}>STT</th>
              <th style={styles.th}>Tên loại món</th>
              <th style={{ ...styles.th, width: '200px', textAlign: 'right' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat._id}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>
                  {editingId === cat._id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      style={styles.editInput}
                      autoFocus
                    />
                  ) : (
                    <strong>{cat.name}</strong>
                  )}
                </td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  {editingId === cat._id ? (
                    <div style={styles.btnGroup}>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(cat._id)}
                        style={styles.saveBtn}
                      >
                        Lưu
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        style={styles.cancelBtn}
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <div style={styles.btnGroup}>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(cat)}
                        style={styles.editBtn}
                      >
                        ✎ Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat)}
                        style={styles.deleteBtn}
                      >
                        🗑 Xóa
                      </button>
                    </div>
                  )}
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
  addForm: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  input: { flex: 1, minWidth: '220px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' },
  addBtn: { padding: '10px 18px', backgroundColor: '#ea580c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' },
  tableWrap: { backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left', fontSize: '13px', color: '#4b5563' },
  td: { padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#111827' },
  editInput: { padding: '6px 10px', borderRadius: '6px', border: '1px solid #ea580c', fontSize: '14px', width: '100%', maxWidth: '300px' },
  btnGroup: { display: 'inline-flex', gap: '8px' },
  editBtn: { padding: '6px 12px', backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #fdba74', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  deleteBtn: { padding: '6px 12px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  saveBtn: { padding: '6px 12px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  cancelBtn: { padding: '6px 12px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }
};