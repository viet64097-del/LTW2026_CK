import React, { useState } from 'react';
import ApproveRecipesTab from '../../components/admin/ApproveRecipesTab';
import ManageCategoriesTab from '../../components/admin/ManageCategoriesTab';
import ManageReviewsTab from '../../components/admin/ManageReviewsTab';
import TopRatedRecipesTab from '../../components/admin/TopRatedRecipesTab';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('approve'); // 'approve' | 'categories' | 'reviews' | 'topRated'

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛡️ Bảng Điều Khiển Quản Trị (Admin)</h1>
        <p style={styles.subtitle}>
          Duyệt công thức mới, quản lý danh mục loại món, kiểm duyệt bình luận và xem thống kê.
        </p>
      </div>

      <div style={styles.tabBar}>
        <button
          type="button"
          onClick={() => setActiveTab('approve')}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === 'approve' ? '3px solid #ea580c' : '3px solid transparent',
            color: activeTab === 'approve' ? '#ea580c' : '#6b7280'
          }}
        >
          📋 Duyệt công thức
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === 'categories' ? '3px solid #ea580c' : '3px solid transparent',
            color: activeTab === 'categories' ? '#ea580c' : '#6b7280'
          }}
        >
          📂 Quản lý loại món
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === 'reviews' ? '3px solid #ea580c' : '3px solid transparent',
            color: activeTab === 'reviews' ? '#ea580c' : '#6b7280'
          }}
        >
          💬 Bình luận vi phạm
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('topRated')}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === 'topRated' ? '3px solid #ea580c' : '3px solid transparent',
            color: activeTab === 'topRated' ? '#ea580c' : '#6b7280'
          }}
        >
          🏆 Top đánh giá cao
        </button>
      </div>

      <div>
        {activeTab === 'approve' && <ApproveRecipesTab />}
        {activeTab === 'categories' && <ManageCategoriesTab />}
        {activeTab === 'reviews' && <ManageReviewsTab />}
        {activeTab === 'topRated' && <TopRatedRecipesTab />}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1120px', margin: '28px auto', padding: '0 20px' },
  header: { marginBottom: '20px' },
  title: { margin: '0 0 6px 0', fontSize: '26px', color: '#111827' },
  subtitle: { margin: 0, fontSize: '14px', color: '#6b7280' },
  tabBar: { display: 'flex', gap: '20px', borderBottom: '1px solid #e5e7eb', marginBottom: '24px', overflowX: 'auto' },
  tabBtn: { background: 'none', border: 'none', padding: '12px 4px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  placeholder: { padding: '40px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db', color: '#6b7280' }
};