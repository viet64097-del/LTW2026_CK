import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import { MOCK_RECIPES } from './utils/mockData';

function HomePreview() {
  const approvedRecipes = MOCK_RECIPES.filter((r) => r.status === 'approved');
  return (
    <div style={{ maxWidth: '1100px', margin: '28px auto', padding: '0 20px' }}>
      <h2>Khám phá công thức nấu ăn ({approvedRecipes.length} món đã duyệt)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
        {approvedRecipes.map((recipe) => (
          <div key={recipe._id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
            <img src={recipe.thumbnail} alt={recipe.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '14px' }}>
              <span style={{ fontSize: '12px', background: '#ffedd5', color: '#c2410c', padding: '3px 8px', borderRadius: '4px' }}>
                {recipe.category.name}
              </span>
              <h3 style={{ margin: '10px 0 6px 0', fontSize: '18px' }}>{recipe.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                ⏱ {recipe.cookTime} phút • Độ khó: {recipe.difficulty} • ⭐ {recipe.avgRating} ({recipe.ratingCount})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PagePlaceholder = ({ title }) => (
  <div style={{ maxWidth: '1100px', margin: '28px auto', padding: '20px' }}>
    <h2>{title}</h2>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePreview />} />
        <Route path="/login" element={<PagePlaceholder title="Trang Đăng nhập / Đăng ký" />} />
        <Route path="/search-ingredients" element={<PagePlaceholder title="Tìm món theo nguyên liệu đang có " />} />
        <Route path="/recipes/:id" element={<PagePlaceholder title="Chi tiết công thức & Chế độ nấu từng bước " />} />

        <Route element={<ProtectedRoute allowedRoles={['member', 'admin']} />}>
          <Route path="/recipes/create" element={<PagePlaceholder title="Đăng công thức mới - Form động" />} />
          <Route path="/recipes/edit/:id" element={<PagePlaceholder title="Chỉnh sửa công thức" />} />
          <Route path="/my-recipes" element={<PagePlaceholder title="Công thức của tôi & Món yêu thích" />} />
          <Route path="/meal-planner" element={<PagePlaceholder title="Thực đơn tuần 7x3 & Danh sách đi chợ" />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/approve" element={<PagePlaceholder title="Admin Dashboard: Duyệt bài & Quản lý hệ thống" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}