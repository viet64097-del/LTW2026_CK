import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteRecipe } from '../../redux/authSlice';

export default function RecipeCard({ recipe, matchedCount, totalSelected }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorite = user?.favorites?.includes(recipe._id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để lưu món ăn yêu thích!');
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteRecipe(recipe._id));
  };

  const getDifficultyBadgeStyle = (difficulty) => {
    if (difficulty === 'Dễ') return { background: '#dcfce7', color: '#15803d' };
    if (difficulty === 'Khó') return { background: '#fee2e2', color: '#b91c1c' };
    return { background: '#fef3c7', color: '#b45309' };
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageWrapper}>
        <img src={recipe.thumbnail} alt={recipe.title} style={styles.image} />
        <button
          onClick={handleToggleFavorite}
          title={isFavorite ? 'Bỏ yêu thích' : 'Lưu món yêu thích'}
          style={{
            ...styles.favBtn,
            color: isFavorite ? '#ef4444' : '#9ca3af'
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {matchedCount !== undefined && (
          <span style={styles.matchBadge}>
            Khớp {matchedCount}/{totalSelected} nguyên liệu
          </span>
        )}
      </div>

      <div style={styles.body}>
        <div style={styles.metaTop}>
          <span style={styles.categoryTag}>{recipe.category?.name}</span>
          <span style={{ ...styles.diffTag, ...getDifficultyBadgeStyle(recipe.difficulty) }}>
            {recipe.difficulty}
          </span>
        </div>

        <Link to={`/recipes/${recipe._id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{recipe.title}</h3>
        </Link>

        <p style={styles.author}>Bởi: {recipe.author?.name}</p>

        <div style={styles.footer}>
          <span>⏱ {recipe.cookTime} phút</span>
          <span>⭐ {recipe.avgRating} ({recipe.ratingCount} đánh giá)</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
  },
  imageWrapper: { position: 'relative', height: '185px', width: '100%' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  favBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  matchBadge: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    backgroundColor: '#16a34a',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '20px'
  },
  body: { padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 },
  metaTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  categoryTag: { fontSize: '12px', background: '#ffedd5', color: '#c2410c', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 },
  diffTag: { fontSize: '12px', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 },
  titleLink: { textDecoration: 'none', color: '#111827' },
  title: { margin: '0 0 6px 0', fontSize: '17px', lineHeight: '1.4' },
  author: { margin: '0 0 12px 0', fontSize: '13px', color: '#6b7280' },
  footer: {
    marginTop: 'auto',
    paddingTop: '10px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#4b5563',
    fontWeight: 500
  }
};