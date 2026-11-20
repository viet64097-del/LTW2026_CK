import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, DIFFICULTIES, MOCK_RECIPES } from '../../utils/mockData';

const STANDARD_UNITS = [
  'gram',
  'kg',
  'ml',
  'lít',
  'thìa cà phê',
  'thìa canh',
  'quả',
  'củ',
  'nhánh',
  'gói',
  'miếng'
];

export default function RecipeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0]?._id || '');
  const [cookTime, setCookTime] = useState(30);
  const [servings, setServings] = useState(2);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0] || 'Dễ');
  const [thumbnail, setThumbnail] = useState('');

  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: 'gram' }
  ]);

  const [steps, setSteps] = useState([
    { instruction: '', timerMinutes: 0, imageUrl: '' }
  ]);

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const existing = MOCK_RECIPES.find((r) => r._id === id);
      if (existing) {
        setTitle(existing.title);
        setCategoryId(existing.category?._id || '');
        setCookTime(existing.cookTime);
        setServings(existing.servings);
        setDifficulty(existing.difficulty);
        setThumbnail(existing.thumbnail || '');
        setIngredients(
          existing.ingredients?.length > 0
            ? existing.ingredients.map((i) => ({ ...i }))
            : [{ name: '', quantity: '', unit: 'gram' }]
        );
        setSteps(
          existing.steps?.length > 0
            ? existing.steps.map((s) => ({
                instruction: s.instruction || '',
                timerMinutes: s.timerMinutes || 0,
                imageUrl: s.imageUrl || ''
              }))
            : [{ instruction: '', timerMinutes: 0, imageUrl: '' }]
        );
      }
    }
  }, [id, isEditMode]);

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', quantity: '', unit: 'gram' }]);
  };

  const handleRemoveIngredient = (index) => {
    if (ingredients.length <= 1) return;
    setIngredients((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    setIngredients((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddStep = () => {
    setSteps((prev) => [...prev, { instruction: '', timerMinutes: 0, imageUrl: '' }]);
  };

  const handleRemoveStep = (index) => {
    if (steps.length <= 1) return;
    setSteps((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleStepChange = (index, field, value) => {
    setSteps((prev) =>
      prev.map((step, idx) => (idx === index ? { ...step, [field]: value } : step))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Vui lòng nhập tên món ăn.');
      return;
    }

    const validIngredients = ingredients.filter(
      (i) => i.name.trim() !== '' && Number(i.quantity) > 0
    );
    if (validIngredients.length === 0) {
      setError('Vui lòng nhập ít nhất 1 nguyên liệu hợp lệ (tên và số lượng > 0).');
      return;
    }

    const validSteps = steps.filter((s) => s.instruction.trim() !== '');
    if (validSteps.length === 0) {
      setError('Vui lòng nhập ít nhất 1 bước thực hiện.');
      return;
    }

    const payload = {
      title: title.trim(),
      categoryId,
      cookTime: Number(cookTime),
      servings: Number(servings),
      difficulty,
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      ingredients: validIngredients.map((i) => ({
        name: i.name.trim().toLowerCase(),
        quantity: Number(i.quantity),
        unit: i.unit
      })),
      steps: validSteps.map((s, idx) => ({
        stepNumber: idx + 1,
        instruction: s.instruction.trim(),
        timerMinutes: Number(s.timerMinutes) || 0,
        imageUrl: s.imageUrl.trim()
      }))
    };

    console.log('Dữ liệu công thức gửi đi:', payload);
    alert(
      isEditMode
        ? 'Cập nhật công thức thành công!'
        : 'Đăng công thức thành công! Bài viết đang chờ Admin duyệt.'
    );
    navigate('/my-recipes');
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.pageTitle}>
          {isEditMode ? '✎ Chỉnh Sửa Công Thức' : '🍳 Đăng Công Thức Mới'}
        </h1>
        <button type="button" onClick={() => navigate(-1)} style={styles.cancelBtn}>
          ← Quay lại
        </button>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>1. Thông tin chung</h2>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Tên món ăn *</label>
            <input
              type="text"
              placeholder="Ví dụ: Thịt kho tàu trứng cút"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.grid4}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Loại món</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={styles.input}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Độ khó</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={styles.input}
              >
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Thời gian nấu (phút)</label>
              <input
                type="number"
                min="1"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Khẩu phần (người)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Link ảnh bìa món ăn (URL)</label>
            <input
              type="url"
              placeholder="https://..."
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              style={styles.input}
            />
          </div>
        </section>

        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>2. Nguyên liệu ({ingredients.length})</h2>
            <button type="button" onClick={handleAddIngredient} style={styles.addRowBtn}>
              + Thêm nguyên liệu
            </button>
          </div>

          <div style={styles.dynamicList}>
            {ingredients.map((ing, index) => (
              <div key={index} style={styles.ingRow}>
                <input
                  type="text"
                  placeholder="Tên nguyên liệu (vd: thịt bò)"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  style={{ ...styles.input, flex: 2 }}
                />
                <input
                  type="number"
                  step="any"
                  min="0"
                  placeholder="Số lượng"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                />
                <select
                  value={ing.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                >
                  {STANDARD_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  disabled={ingredients.length <= 1}
                  style={{
                    ...styles.removeBtn,
                    opacity: ingredients.length <= 1 ? 0.4 : 1
                  }}
                  title="Xóa dòng này"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>3. Các bước thực hiện ({steps.length})</h2>
            <button type="button" onClick={handleAddStep} style={styles.addRowBtn}>
              + Thêm bước làm
            </button>
          </div>

          <div style={styles.dynamicList}>
            {steps.map((step, index) => (
              <div key={index} style={styles.stepBox}>
                <div style={styles.stepTop}>
                  <strong style={{ color: '#ea580c' }}>Bước {index + 1}</strong>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    disabled={steps.length <= 1}
                    style={{
                      ...styles.removeBtn,
                      opacity: steps.length <= 1 ? 0.4 : 1
                    }}
                  >
                    Xóa bước
                  </button>
                </div>

                <textarea
                  rows={3}
                  placeholder="Mô tả chi tiết cách làm ở bước này..."
                  value={step.instruction}
                  onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                  style={{ ...styles.input, width: '100%', fontFamily: 'inherit', marginBottom: '10px' }}
                />

                <div style={styles.stepMetaRow}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.smallLabel}>Hẹn giờ cho bước này (phút - nhập 0 nếu không cần)</label>
                    <input
                      type="number"
                      min="0"
                      value={step.timerMinutes}
                      onChange={(e) => handleStepChange(index, 'timerMinutes', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={styles.smallLabel}>Link ảnh minh họa bước (tùy chọn)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={step.imageUrl}
                      onChange={(e) => handleStepChange(index, 'imageUrl', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={styles.submitRow}>
          <button type="submit" style={styles.submitBtn}>
            {isEditMode ? '💾 Lưu thay đổi' : '🚀 Đăng công thức'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '28px auto', padding: '0 20px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  pageTitle: { margin: 0, fontSize: '26px', color: '#111827' },
  cancelBtn: { padding: '8px 14px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontWeight: 600 },
  errorBox: { padding: '12px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '18px', fontWeight: 500 },
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  card: { backgroundColor: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid #e5e7eb' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  sectionTitle: { margin: '0 0 16px 0', fontSize: '18px', color: '#111827' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' },
  label: { fontSize: '14px', fontWeight: 600, color: '#374151' },
  smallLabel: { display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' },
  input: { padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box', width: '100%' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' },
  dynamicList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  ingRow: { display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' },
  addRowBtn: { padding: '7px 14px', backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #fdba74', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  removeBtn: { padding: '8px 12px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  stepBox: { padding: '16px', backgroundColor: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb' },
  stepTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  stepMetaRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  submitRow: { display: 'flex', justifyContent: 'flex-end' },
  submitBtn: { padding: '12px 28px', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }
};