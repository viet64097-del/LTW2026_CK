import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGroceryList } from '../../redux/mealPlanSlice';

export default function GroceryListPanel() {
    const groceryList = useSelector(selectGroceryList);
    const [checkedKeys, setCheckedKeys] = useState({});

    const toggleItem = (key) => {
        setCheckedKeys((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const resetChecked = () => setCheckedKeys({});

    const boughtCount = groceryList.filter((item) => checkedKeys[item.key]).length;

    const formatQuantity = (qty) => {
        return Number.isInteger(qty) ? qty : Number(qty.toFixed(2));
    };

    return (
        <div className="print-keep-together" style={styles.container}>
            <div style={styles.headerRow}>
                <div>
                    <h2 style={styles.title}>🛒 Danh Sách Đi Chợ Tự Động</h2>
                    <p style={styles.subtitle}>
                        Tự động cộng dồn nguyên liệu trùng tên & đơn vị từ thực đơn tuần.
                    </p>
                </div>

                {groceryList.length > 0 && (
                    <div style={styles.metaRight}>
                        <span style={styles.progressBadge}>
                            Đã mua: {boughtCount} / {groceryList.length}
                        </span>
                        {boughtCount > 0 && (
                            <button type="button" className="no-print" onClick={resetChecked} style={styles.resetBtn}>
                                Bỏ tích tất cả
                            </button>
                        )}
                    </div>
                )}
            </div>

            {groceryList.length === 0 ? (
                <div style={styles.emptyBox}>
                    Chưa có nguyên liệu nào. Hãy chọn ít nhất 1 món ăn vào bảng Thực đơn tuần phía trên!
                </div>
            ) : (
                <div style={styles.grid}>
                    {groceryList.map((item) => {
                        const isChecked = Boolean(checkedKeys[item.key]);
                        return (
                            <label
                                key={item.key}
                                style={{
                                    ...styles.itemCard,
                                    backgroundColor: isChecked ? '#f3f4f6' : '#f9fafb',
                                    opacity: isChecked ? 0.65 : 1
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleItem(item.key)}
                                    style={styles.checkbox}
                                />
                                <span
                                    style={{
                                        ...styles.itemName,
                                        textDecoration: isChecked ? 'line-through' : 'none'
                                    }}
                                >
                                    {item.name}
                                </span>
                                <strong style={styles.itemQty}>
                                    {formatQuantity(item.quantity)} {item.unit}
                                </strong>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        marginTop: '28px',
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '14px',
        border: '1px solid #e5e7eb'
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '18px'
    },
    title: { margin: '0 0 4px 0', fontSize: '20px', color: '#111827' },
    subtitle: { margin: 0, fontSize: '13px', color: '#6b7280' },
    metaRight: { display: 'flex', alignItems: 'center', gap: '10px' },
    progressBadge: {
        backgroundColor: '#ecfdf5',
        color: '#047857',
        padding: '6px 12px',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '13px'
    },
    resetBtn: {
        padding: '6px 12px',
        backgroundColor: '#ffffff',
        color: '#374151',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600
    },
    emptyBox: {
        padding: '28px',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: '10px',
        border: '1px dashed #d1d5db',
        color: '#6b7280',
        fontSize: '14px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '10px'
    },
    itemCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 14px',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        userSelect: 'none'
    },
    checkbox: { width: '16px', height: '16px', cursor: 'pointer', accentColor: '#ea580c' },
    itemName: { flex: 1, fontSize: '15px', color: '#1f2937', textTransform: 'capitalize' },
    itemQty: { fontSize: '14px', color: '#ea580c', whiteSpace: 'nowrap' }
};
