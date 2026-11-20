import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteRecipe } from '../../redux/authSlice';
import { MOCK_RECIPES } from '../../utils/mockData';

export default function MyRecipesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('mine'); 
  const [recipes, setRecipes] = useState(MOCK_RECIPES);
  const myRecipes = recipes.filter((r) => r.author?._id === user?._id);
  const favoriteRecipes = recipes.filter((r) => user?.favorites?.includes(r._id));

  const handleDeleteRecipe = (recipe) => {
    if (recipe.author?._id !== user?._id) {
      alert('Bạn không có quyền xóa công thức của người khác!');
      return;
    }

    const confirmed = window.confirm(`Bạn có chắc muốn xóa món "${recipe.title}" không?`);
    if (confirmed) {
      setRecipes((prev) => prev.filter((item) => item._id !== recipe._id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>📚 Sổ Tay Cá Nhân</h1>
          <p style={styles.subtitle}>Quản lý các công thức bạn đã đăng và danh sách món yêu thích.</p>
        </div>
        <Link to="/recipes/create" style={styles.createBtn}>
          + Đăng món mới
        </Link>
      </div>

      <div style={styles.tabBar}>
        <button
          type="button"
          onClick={() => setActiveTab('mine')}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === 'mine' ? '3px solid #ea580c' : '3px solid transparent',
            color: activeTab === 'mine' ? '#ea580c' : '#6b7280'
          }}
        >
          🍳 Công thức của tôi ({myRecipes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('favorites')}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === 'favorites' ? '3px solid #ea580c' : '3px solid transparent',
            color: activeTab === 'favorites' ? '#ea580c' : '#6b7280'
          }}
        >
          ❤️ Món ăn yêu thích ({favoriteRecipes.length})
        </button>
      </div>

      {activeTab === 'mine' && (
        <div>
          {myRecipes.length === 0 ? (
            <div style={styles.emptyBox}>
              <p>Bạn chưa đăng công thức nấu ăn nào.</p>
              <Link to="/recipes/create" style={styles.createBtn}>
                Đăng công thức đầu tiên ngay
              </Link>
            </div>
          ) : (
            <div style={styles.grid}>
              {myRecipes.map((recipe) => (
                <div key={recipe._id} style={styles.card}>
                  <img src={recipe.thumbnail} alt={recipe.title} style={styles.cardImg} />
                  <div style={styles.cardBody}>
                    <div style={styles.statusRow}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: recipe.status === 'approved' ? '#dcfce7' : '#fef3c7',
                          color: recipe.status === 'approved' ? '#166534' : '#92400e'
                        }}
                      >
                        {recipe.status === 'approved' ? '✓ Đã duyệt' : '⏳ Chờ duyệt'}
                      </span>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>⏱ {recipe.cookTime} phút</span>
                    </div>

                    <h3 style={styles.cardTitle}>
                      <Link to={`/recipes/${recipe._id}`} style={styles.titleLink}>
                        {recipe.title}
                      </Link>
                    </h3>

                    <div style={styles.actionRow}>
                      <button
                        type="button"
                        onClick={() => navigate(`/recipes/edit/${recipe._id}`)}
                        style={styles.editBtn}
                      >
                        ✎ Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRecipe(recipe)}
                        style={styles.deleteBtn}
                      >
                        🗑 Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div>
          {favoriteRecipes.length === 0 ? (
            <div style={styles.emptyBox}>
              <p>Bạn chưa lưu món ăn yêu thích nào.</p>
              <Link to="/" style={styles.createBtn}>
                Khám phá món ngon ngay
              </Link>
            </div>
          ) : (
            <div style={styles.grid}>
              {favoriteRecipes.map((recipe) => (
                <div key={recipe._id} style={styles.card}>
                  <img src={recipe.thumbnail} alt={recipe.title} style={styles.cardImg} />
                  <div style={styles.cardBody}>
                    <div style={styles.statusRow}>
                      <span style={{ fontSize: '13px', color: '#ea580c', fontWeight: 600 }}>
                        {recipe.category?.name}
                      </span>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>⭐ {recipe.avgRating}</span>
                    </div>

                    <h3 style={styles.cardTitle}>
                      <Link to={`/recipes/${recipe._id}`} style={styles.titleLink}>
                        {recipe.title}
                      </Link>
                    </h3>

                    <div style={styles.actionRow}>
                      <Link to={`/recipes/${recipe._id}`} style={styles.viewBtn}>
                        Xem cách làm
                      </Link>
                      <button
                        type="button"
                        onClick={() => dispatch(toggleFavoriteRecipe(recipe._id))}
                        style={styles.unfavBtn}
                      >
                        💔 Bỏ lưu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1120px', margin: '28px auto', padding: '0 20px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' },
  title: { margin: '0 0 6px 0', fontSize: '26px', color: '#111827' },
  subtitle: { margin: 0, color: '#6b7280', fontSize: '14px' },
  createBtn: { padding: '10px 18px', backgroundColor: '#ea580c', color: '#ffffff', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', display: 'inline-block' },
  tabBar: { display: 'flex', gap: '20px', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' },
  tabBtn: { background: 'none', border: 'none', padding: '12px 4px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' },
  emptyBox: { textAlign: 'center', padding: '50px 20px', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px dashed #d1d5db', color: '#6b7280' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  cardImg: { width: '100%', height: '170px', objectFit: 'cover' },
  cardBody: { padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 },
  statusRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  statusBadge: { padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 },
  cardTitle: { margin: '0 0 14px 0', fontSize: '17px', flex: 1 },
  titleLink: { color: '#111827', textDecoration: 'none' },
  actionRow: { display: 'flex', gap: '10px', marginTop: 'auto' },
  editBtn: { flex: 1, padding: '8px', backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #fdba74', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  deleteBtn: { flex: 1, padding: '8px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  viewBtn: { flex: 1, padding: '8px', backgroundColor: '#f3f4f6', color: '#111827', textDecoration: 'none', textAlign: 'center', borderRadius: '8px', fontWeight: 600, fontSize: '13px' },
  unfavBtn: { flex: 1, padding: '8px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }
};