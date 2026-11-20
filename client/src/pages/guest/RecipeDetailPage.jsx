import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteRecipe } from '../../redux/authSlice';
import { MOCK_RECIPES } from '../../utils/mockData';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const recipe = MOCK_RECIPES.find((item) => item._id === id);

  const [currentServings, setCurrentServings] = useState(recipe ? recipe.servings : 2);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    if (recipe) {
      setCurrentServings(recipe.servings);
      setCheckedIngredients([]);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div style={styles.notFoundBox}>
        <h2>Không tìm thấy công thức nấu ăn này!</h2>
        <button onClick={() => navigate('/')} style={styles.backHomeBtn}>
          Về trang chủ
        </button>
      </div>
    );
  }

  const isFavorite = user?.favorites?.includes(recipe._id);
  const isOwner = user?._id === recipe.author?._id;

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để lưu công thức yêu thích!');
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteRecipe(recipe._id));
  };

  const handleChangeServings = (delta) => {
    setCurrentServings((prev) => {
      const nextVal = prev + delta;
      return nextVal >= 1 && nextVal <= 20 ? nextVal : prev;
    });
  };

  const handleToggleCheckIngredient = (ingName) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingName) ? prev.filter((item) => item !== ingName) : [...prev, ingName]
    );
  };

  const calculateScaledQuantity = (baseQty) => {
    const scaled = (baseQty * currentServings) / recipe.servings;
    return Number.isInteger(scaled) ? scaled : Number(scaled.toFixed(1));
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Quay lại
        </button>

        {isOwner && (
          <Link to={`/recipes/edit/${recipe._id}`} style={styles.editLink}>
            ✎ Sửa công thức của tôi
          </Link>
        )}
      </div>

      <div style={styles.heroGrid}>
        <div style={styles.imageBox}>
          <img src={recipe.thumbnail} alt={recipe.title} style={styles.mainImage} />
        </div>

        <div style={styles.infoBox}>
          <div style={styles.badgeRow}>
            <span style={styles.categoryBadge}>{recipe.category?.name}</span>
            <span style={styles.difficultyBadge}>Độ khó: {recipe.difficulty}</span>
          </div>

          <h1 style={styles.title}>{recipe.title}</h1>
          <p style={styles.authorText}>
            Đăng bởi: <strong>{recipe.author?.name}</strong>
          </p>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Thời gian nấu</span>
              <strong style={styles.statValue}>⏱ {recipe.cookTime} phút</strong>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Đánh giá</span>
              <strong style={styles.statValue}>
                ⭐ {recipe.avgRating} ({recipe.ratingCount})
              </strong>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Khẩu phần gốc</span>
              <strong style={styles.statValue}>👥 {recipe.servings} người</strong>
            </div>
          </div>

          <div style={styles.actionRow}>
            <button
              type="button"
              onClick={handleToggleFavorite}
              style={{
                ...styles.favButton,
                backgroundColor: isFavorite ? '#fef2f2' : '#ffffff',
                borderColor: isFavorite ? '#f87171' : '#d1d5db',
                color: isFavorite ? '#dc2626' : '#374151'
              }}
            >
              {isFavorite ? '❤️ Đã lưu vào Yêu thích' : '🤍 Lưu món yêu thích'}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.ingredientsCard}>
          <div style={styles.ingHeader}>
            <h2 style={styles.sectionTitle}>🥗 Nguyên liệu</h2>

            <div style={styles.servingsControl}>
              <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>
                Khẩu phần:
              </span>
              <button
                type="button"
                onClick={() => handleChangeServings(-1)}
                style={styles.stepBtn}
                disabled={currentServings <= 1}
              >
                −
              </button>
              <strong style={styles.servingsNumber}>{currentServings} người</strong>
              <button
                type="button"
                onClick={() => handleChangeServings(1)}
                style={styles.stepBtn}
              >
                +
              </button>
            </div>
          </div>

          {currentServings !== recipe.servings && (
            <div style={styles.scaleNotice}>
              ✨ Đã tự động tính lại lượng nguyên liệu cho <strong>{currentServings} người</strong> (Gốc: {recipe.servings} người)
              <button
                type="button"
                onClick={() => setCurrentServings(recipe.servings)}
                style={styles.resetScaleBtn}
              >
                Đặt lại
              </button>
            </div>
          )}

          <ul style={styles.ingList}>
            {recipe.ingredients.map((ing, index) => {
              const isChecked = checkedIngredients.includes(ing.name);
              const scaledQty = calculateScaledQuantity(ing.quantity);

              return (
                <li
                  key={index}
                  onClick={() => handleToggleCheckIngredient(ing.name)}
                  style={{
                    ...styles.ingItem,
                    textDecoration: isChecked ? 'line-through' : 'none',
                    opacity: isChecked ? 0.55 : 1
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={styles.ingName}>{ing.name}</span>
                  <strong style={styles.ingQty}>
                    {scaledQty} {ing.unit}
                  </strong>
                </li>
              );
            })}
          </ul>
          <p style={styles.tipText}>💡 Mẹo: Bấm vào từng dòng nguyên liệu để đánh dấu đã chuẩn bị xong.</p>
        </div>

        <div style={styles.stepsCard}>
          <div style={styles.stepsHeader}>
            <h2 style={styles.sectionTitle}>👩‍🍳 Các bước thực hiện ({recipe.steps.length} bước)</h2>
          </div>

          <div style={styles.stepsList}>
            {recipe.steps.map((step, idx) => (
              <div key={idx} style={styles.stepItem}>
                <div style={styles.stepBadge}>Bước {step.stepNumber || idx + 1}</div>
                <div style={styles.stepBody}>
                  <p style={styles.stepInstruction}>{step.instruction}</p>

                  {step.timerMinutes > 0 && (
                    <div style={styles.timerTag}>
                      ⏲ Thời gian bước này: <strong>{step.timerMinutes} phút</strong>
                    </div>
                  )}

                  {step.imageUrl && (
                    <img
                      src={step.imageUrl}
                      alt={`Bước ${idx + 1}`}
                      style={styles.stepImage}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1120px', margin: '28px auto', padding: '0 20px' },
  notFoundBox: { textAlign: 'center', padding: '60px 20px' },
  backHomeBtn: { padding: '10px 18px', background: '#ea580c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  backBtn: { padding: '8px 14px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#ffffff', cursor: 'pointer', fontWeight: 600 },
  editLink: { padding: '8px 14px', borderRadius: '8px', background: '#fff7ed', color: '#ea580c', border: '1px solid #fdba74', textDecoration: 'none', fontWeight: 600, fontSize: '14px' },
  heroGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', marginBottom: '28px' },
  imageBox: { borderRadius: '12px', overflow: 'hidden', maxHeight: '340px' },
  mainImage: { width: '100%', height: '100%', objectFit: 'cover' },
  infoBox: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  badgeRow: { display: 'flex', gap: '10px', marginBottom: '12px' },
  categoryBadge: { background: '#ffedd5', color: '#c2410c', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600 },
  difficultyBadge: { background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 600 },
  title: { margin: '0 0 8px 0', fontSize: '28px', color: '#111827' },
  authorText: { margin: '0 0 20px 0', color: '#6b7280', fontSize: '14px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '22px' },
  statCard: { padding: '12px', backgroundColor: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '12px', color: '#6b7280' },
  statValue: { fontSize: '15px', color: '#111827' },
  actionRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  favButton: { padding: '11px 20px', borderRadius: '10px', border: '1px solid', fontWeight: 600, cursor: 'pointer', fontSize: '14px' },
  contentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' },
  ingredientsCard: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' },
  ingHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' },
  sectionTitle: { margin: 0, fontSize: '20px', color: '#111827' },
  servingsControl: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff7ed', padding: '6px 12px', borderRadius: '10px', border: '1px solid #fed7aa' },
  stepBtn: { width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #fdba74', background: '#ffffff', color: '#ea580c', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
  servingsNumber: { minWidth: '65px', textAlign: 'center', color: '#9a3412', fontSize: '14px' },
  scaleNotice: { padding: '10px 12px', backgroundColor: '#ecfdf5', color: '#047857', borderRadius: '8px', fontSize: '13px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  resetScaleBtn: { border: 'none', background: 'transparent', color: '#047857', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600, fontSize: '12px' },
  ingList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  ingItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#f9fafb', border: '1px solid #f3f4f6', cursor: 'pointer' },
  ingName: { flex: 1, fontSize: '15px', color: '#1f2937', textTransform: 'capitalize' },
  ingQty: { color: '#ea580c', fontSize: '15px' },
  tipText: { margin: '14px 0 0 0', fontSize: '12px', color: '#6b7280' },
  stepsCard: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' },
  stepsHeader: { marginBottom: '18px' },
  stepsList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  stepItem: { display: 'flex', gap: '14px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' },
  stepBadge: { background: '#ea580c', color: '#ffffff', fontWeight: 'bold', fontSize: '13px', padding: '6px 12px', borderRadius: '8px', height: 'fit-content', whiteSpace: 'nowrap' },
  stepBody: { flex: 1 },
  stepInstruction: { margin: '0 0 10px 0', fontSize: '15px', lineHeight: '1.6', color: '#1f2937' },
  timerTag: { display: 'inline-block', padding: '5px 10px', backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '6px', fontSize: '13px', marginBottom: '10px' },
  stepImage: { width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '10px', marginTop: '6px' }
};