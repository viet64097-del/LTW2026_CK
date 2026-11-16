import React, { useState, useMemo } from 'react';
import RecipeCard from '../../components/recipe/RecipeCard';
import FilterBar from '../../components/recipe/FilterBar';
import { useDebounce } from '../../hooks/useDebounce';
import { MOCK_RECIPES } from '../../utils/mockData';

const INITIAL_FILTERS = {
  categoryId: '',
  maxCookTime: '',
  difficulty: ''
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const isTyping = searchTerm !== debouncedSearch;

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetAll = () => {
    setSearchTerm('');
    setFilters(INITIAL_FILTERS);
  };

  const filteredRecipes = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();

    return MOCK_RECIPES.filter((recipe) => {
      if (recipe.status !== 'approved') return false;

      if (keyword && !recipe.title.toLowerCase().includes(keyword)) {
        return false;
      }

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
  }, [debouncedSearch, filters]);

  return (
    <div style={styles.container}>
      <div style={styles.heroBanner}>
        <h1 style={styles.heroTitle}>Khám Phá Công Thức Nấu Ăn Mỗi Ngày</h1>
        <p style={styles.heroSub}>
          Tìm kiếm món ngon theo tên, lọc theo thời gian nấu và lưu thực đơn cho cả tuần.
        </p>

        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Nhập tên món ăn cần tìm (ví dụ: Bò lúc lắc, Canh cà chua...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={styles.clearInputBtn}
              title="Xóa từ khóa"
            >
              ×
            </button>
          )}
        </div>
        <div style={styles.statusRow}>
          {isTyping ? (
            <span style={{ color: '#ea580c', fontWeight: 600 }}>
              ⏳ Đang chờ bạn ngừng gõ (Debounce 500ms)...
            </span>
          ) : (
            debouncedSearch && (
              <span style={{ color: '#15803d', fontWeight: 500 }}>
                ✓ Kết quả cho từ khóa: "{debouncedSearch}"
              </span>
            )
          )}
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetAll}
      />

      <div style={styles.resultHeader}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>
          Danh sách món ăn ({filteredRecipes.length} kết quả)
        </h2>
      </div>

      {filteredRecipes.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280' }}>
            Không tìm thấy công thức nào khớp với từ khóa hoặc bộ lọc hiện tại.
          </p>
          <button onClick={handleResetAll} style={styles.clearBtn}>
            Xóa tìm kiếm & bộ lọc
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
    marginBottom: '20px'
  },
  heroTitle: { margin: '0 0 8px 0', color: '#9a3412', fontSize: '26px' },
  heroSub: { margin: '0 0 18px 0', color: '#c2410c', fontSize: '15px' },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '640px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '2px solid #fdba74',
    padding: '4px 12px'
  },
  searchIcon: { fontSize: '18px', marginRight: '8px' },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '10px 4px',
    fontSize: '15px',
    backgroundColor: 'transparent'
  },
  clearInputBtn: {
    border: 'none',
    background: '#f3f4f6',
    color: '#4b5563',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '1'
  },
  statusRow: { minHeight: '22px', marginTop: '8px', fontSize: '13px' },
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