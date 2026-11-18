import React, { useState, useMemo } from 'react';
import IngredientTagInput from '../../components/recipe/IngredientTagInput';
import RecipeCard from '../../components/recipe/RecipeCard';
import { MOCK_RECIPES } from '../../utils/mockData';

export default function SearchByIngredientPage() {
  const [selectedIngredients, setSelectedIngredients] = useState(['thịt bò', 'hành tây']);

  const handleAddIngredient = (ingredientName) => {
    if (!selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients((prev) => [...prev, ingredientName]);
    }
  };

  const handleRemoveIngredient = (ingredientName) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== ingredientName));
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
  };

  const matchedRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    return MOCK_RECIPES.filter((recipe) => recipe.status === 'approved')
      .map((recipe) => {
        const recipeIngNames = recipe.ingredients.map((i) => i.name.trim().toLowerCase());

        const matchedList = recipeIngNames.filter((name) =>
          selectedIngredients.includes(name)
        );

        const missingList = recipeIngNames.filter(
          (name) => !selectedIngredients.includes(name)
        );

        return {
          ...recipe,
          matchedCount: matchedList.length,
          matchedList,
          missingList
        };
      })
      .filter((item) => item.matchedCount > 0)
      .sort((a, b) => {
        if (b.matchedCount !== a.matchedCount) {
          return b.matchedCount - a.matchedCount;
        }
        return b.avgRating - a.avgRating;
      });
  }, [selectedIngredients]);

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.title}>🥕 Tìm Món Ăn Theo Nguyên Liệu Đang Có</h1>
        <p style={styles.subtitle}>
          Nhập các nguyên liệu sẵn có trong bếp của bạn. Hệ thống sẽ ưu tiên gợi ý những món khớp nhiều nguyên liệu nhất lên đầu!
        </p>
      </div>

      <IngredientTagInput
        selectedIngredients={selectedIngredients}
        onAddIngredient={handleAddIngredient}
        onRemoveIngredient={handleRemoveIngredient}
        onClearAll={handleClearAll}
      />

      {selectedIngredients.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '15px' }}>
            Hãy thêm ít nhất 1 nguyên liệu ở khung bên trên để bắt đầu tìm món ăn phù hợp.
          </p>
        </div>
      ) : matchedRecipes.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '15px' }}>
            Chưa có công thức nào sử dụng các nguyên liệu: <strong>{selectedIngredients.join(', ')}</strong>.
          </p>
        </div>
      ) : (
        <>
          <div style={styles.resultHeader}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>
              Gợi ý phù hợp nhất ({matchedRecipes.length} món)
            </h2>
            <span style={styles.sortNote}>
              ⇅ Đã sắp xếp: Khớp nhiều nguyên liệu nhất → Điểm đánh giá cao nhất
            </span>
          </div>

          <div style={styles.grid}>
            {matchedRecipes.map((recipe) => (
              <div key={recipe._id} style={styles.cardColumn}>
                <RecipeCard
                  recipe={recipe}
                  matchedCount={recipe.matchedCount}
                  totalSelected={selectedIngredients.length}
                />

                {/* Chi tiết nguyên liệu khớp và nguyên liệu còn thiếu */}
                <div style={styles.ingDetailBox}>
                  <div style={{ marginBottom: '6px', color: '#15803d', fontSize: '13px' }}>
                    <strong>✓ Đã có ({recipe.matchedList.length}):</strong> {recipe.matchedList.join(', ')}
                  </div>
                  <div style={{ color: '#b45309', fontSize: '13px' }}>
                    <strong>+ Cần thêm ({recipe.missingList.length}):</strong>{' '}
                    {recipe.missingList.length > 0 ? recipe.missingList.join(', ') : 'Đủ nguyên liệu!'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1120px', margin: '28px auto', padding: '0 20px' },
  headerBox: { marginBottom: '20px' },
  title: { margin: '0 0 8px 0', color: '#111827', fontSize: '26px' },
  subtitle: { margin: 0, color: '#4b5563', fontSize: '15px' },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '16px'
  },
  sortNote: { fontSize: '13px', color: '#ea580c', fontWeight: 600, background: '#fff7ed', padding: '6px 12px', borderRadius: '6px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' },
  cardColumn: { display: 'flex', flexDirection: 'column', gap: '8px' },
  ingDetailBox: {
    padding: '10px 14px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px'
  },
  emptyBox: {
    textAlign: 'center',
    padding: '48px 20px',
    border: '1px dashed #d1d5db',
    borderRadius: '12px',
    backgroundColor: '#f9fafb'
  }
};