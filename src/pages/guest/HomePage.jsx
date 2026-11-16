// src/pages/guest/HomePage.jsx
import React, { useState, useMemo } from 'react';
import RecipeCard from '../../components/recipe/RecipeCard';
import FilterBar from '../../components/recipe/FilterBar';
import { MOCK_RECIPES } from '../../utils/mockData';

const INITIAL_FILTERS = {
  categoryId: '',
  maxCookTime: '',
  difficulty: ''
};

export default function HomePage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredRecipes = useMemo(() => {
    return MOCK_RECIPES.filter((recipe) => {
      if (recipe.status !== 'approved') return false;

      if (filters.categoryId && recipe.category._id !== filters.categoryId) {
        return false;
      }

      if (filters.maxCookTime && recipe.cookTime > Number(filters.maxCookTime)) {
        return false;
      }

      if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div style={styles.container}>
      <div style={styles.heroBanner}>
        <h1 style={styles.heroTitle}>Khám Phá Công Thức Nấu Ăn Mỗi Ngày</h1>
        <p style={styles.heroSub}>
          Tìm kiếm món ngon theo sở thích, lưu công thức yêu thích và lên thực đơn cho cả tuần.
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      <div style={styles.resultHeader}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>
          Danh sách món ăn ({filteredRecipes.length} kết quả)
        </h2>
      </div>

      {filteredRecipes.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280' }}>
            Không tìm thấy công thức nào khớp với bộ lọc hiện tại.
          </p>
          <button onClick={handleResetFilters} style={styles.clearBtn}>
            Xem tất cả món ăn
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1120px', margin: '28px auto', padding: '0 20px' },
  heroBanner: {
    padding: '28px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    border: '1px solid #fed7aa',
    marginBottom: '24px'
  },
  heroTitle: { margin: '0 0 8px 0', color: '#9a3412', fontSize: '26px' },
  heroSub: { margin: 0, color: '#c2410c', fontSize: '15px' },
  resultHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '22px' },
  emptyBox: {
    textAlign: 'center',
    padding: '48px 20px',
    border: '1px dashed #d1d5db',
    borderRadius: '12px',
    backgroundColor: '#f9fafb'
  },
  clearBtn: {
    padding: '8px 16px',
    backgroundColor: '#ea580c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600
  }
};