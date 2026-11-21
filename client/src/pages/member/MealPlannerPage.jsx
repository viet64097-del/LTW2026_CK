import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DAYS,
  MEAL_TYPES,
  setMeal,
  removeMeal,
  clearMealPlan
} from '../../redux/mealPlanSlice';
import SelectRecipeModal from '../../components/mealPlan/SelectRecipeModal';
import GroceryListPanel from '../../components/mealPlan/GroceryListPanel';

export default function MealPlannerPage() {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.mealPlan.plan);

  const [activeSlot, setActiveSlot] = useState(null);

  const totalScheduled = DAYS.reduce((total, d) => {
    const dayMeals = plan[d.key] || {};
    return (
      total +
      MEAL_TYPES.filter((m) => Boolean(dayMeals[m.key])).length
    );
  }, 0);

  const handleSelectRecipe = (recipe) => {
    if (!activeSlot) return;
    dispatch(
      setMeal({
        day: activeSlot.day,
        mealType: activeSlot.mealType,
        recipe
      })
    );
    setActiveSlot(null);
  };

  const handleClearAll = () => {
    if (totalScheduled === 0) return;
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ thực đơn tuần này?')) {
      dispatch(clearMealPlan());
    }
  };
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <div className="print-only">
        <h1 style={{ margin: '0 0 4px 0', color: '#ea580c', fontSize: '22px' }}>
          SỔ TAY NẤU ĂN — THỰC ĐƠN TUẦN & DANH SÁCH ĐI CHỢ
        </h1>
        <p style={{ margin: 0, fontSize: '12px', color: '#4b5563' }}>
          Ngày xuất: {new Date().toLocaleDateString('vi-VN')} • Tổng số bữa: {totalScheduled} / 21
        </p>
      </div>
      <div style={styles.headerRow}>
        <div className="no-print" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={totalScheduled === 0}
            style={{
              padding: '9px 16px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: totalScheduled === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              opacity: totalScheduled === 0 ? 0.5 : 1
            }}
          >
            🖨️ Xuất PDF / In thực đơn
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            disabled={totalScheduled === 0}
            style={{
              ...styles.clearBtn,
              opacity: totalScheduled === 0 ? 0.5 : 1
            }}
          >
            🗑 Xóa toàn bộ tuần
          </button>
        </div>
        <div>
          <h1 style={styles.title}>📅 Thực Đơn Tuần (7 ngày × 3 bữa)</h1>
          <p style={styles.subtitle}>
            Đã lên lịch <strong>{totalScheduled} / 21</strong> bữa ăn.
          </p>
        </div>
        

        <button
          type="button"
          onClick={handleClearAll}
          disabled={totalScheduled === 0}
          style={{
            ...styles.clearBtn,
            opacity: totalScheduled === 0 ? 0.5 : 1
          }}
        >
          🗑 Xóa toàn bộ tuần
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '110px' }}>Ngày</th>
              {MEAL_TYPES.map((meal) => (
                <th key={meal.key} style={styles.th}>
                  {meal.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day.key}>
                <td style={styles.dayCell}>{day.label}</td>
                {MEAL_TYPES.map((meal) => {
                  const selectedRecipe = plan[day.key]?.[meal.key];
                  return (
                    <td key={meal.key} style={styles.mealCell}>
                      {selectedRecipe ? (
                        <div style={styles.recipeBox}>
                          <img
                            src={selectedRecipe.thumbnail}
                            alt={selectedRecipe.title}
                            style={styles.recipeImg}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <Link
                              to={`/recipes/${selectedRecipe._id}`}
                              style={styles.recipeTitle}
                            >
                              {selectedRecipe.title}
                            </Link>
                            <div style={styles.recipeMeta}>
                              ⏱ {selectedRecipe.cookTime}p • 👥 {selectedRecipe.servings}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(removeMeal({ day: day.key, mealType: meal.key }))
                            }
                            style={styles.removeBtn}
                            title="Bỏ món này"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveSlot({
                              day: day.key,
                              dayLabel: day.label,
                              mealType: meal.key,
                              mealLabel: meal.label
                            })
                          }
                          style={styles.addBtn}
                        >
                          + Chọn món
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GroceryListPanel />
      {activeSlot && (
        <SelectRecipeModal
          dayLabel={activeSlot.dayLabel}
          mealLabel={activeSlot.mealLabel}
          onSelect={handleSelectRecipe}
          onClose={() => setActiveSlot(null)}
        />
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '28px auto', padding: '0 20px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' },
  title: { margin: '0 0 6px 0', fontSize: '26px', color: '#111827' },
  subtitle: { margin: 0, color: '#6b7280', fontSize: '14px' },
  clearBtn: { padding: '9px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' },
  tableWrapper: { overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '760px' },
  th: { padding: '14px 12px', backgroundColor: '#fff7ed', color: '#9a3412', fontWeight: 700, fontSize: '14px', borderBottom: '1px solid #fed7aa', textAlign: 'left' },
  dayCell: { padding: '14px 12px', fontWeight: 700, color: '#111827', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' },
  mealCell: { padding: '10px', borderBottom: '1px solid #e5e7eb', borderRight: '1px solid #f3f4f6', verticalAlign: 'middle', width: '30%' },
  addBtn: { width: '100%', padding: '14px 10px', backgroundColor: '#f9fafb', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  recipeBox: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px' },
  recipeImg: { width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 },
  recipeTitle: { display: 'block', fontWeight: 700, fontSize: '13px', color: '#111827', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  recipeMeta: { fontSize: '11px', color: '#6b7280', marginTop: '2px' },
  removeBtn: { border: 'none', background: '#ffffff', color: '#dc2626', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }
};