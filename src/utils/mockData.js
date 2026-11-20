export const CATEGORIES = [
  { _id: 'cat1', name: 'Món chính' },
  { _id: 'cat2', name: 'Món canh' },
  { _id: 'cat3', name: 'Món ăn sáng' },
  { _id: 'cat4', name: 'Tráng miệng' }
];

export const UNITS = ['gram', 'ml', 'quả', 'củ', 'muỗng canh', 'muỗng cà phê', 'bó'];

export const DIFFICULTIES = ['Dễ', 'Trung bình', 'Khó'];

export const MOCK_USERS = {
  member: {
    _id: 'u1',
    name: 'Nguyễn Tiến Đức',
    email: 'member@recipe.vn',
    role: 'member',
    favorites: ['r1']
  },
  admin: {
    _id: 'u_admin',
    name: 'Quản trị viên',
    email: 'admin@recipe.vn',
    role: 'admin',
    favorites: []
  }
};

export const MOCK_RECIPES = [
  {
    _id: 'r1',
    title: 'Bò lúc lắc khoai tây chiên',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat1', name: 'Món chính' },
    cookTime: 30,
    difficulty: 'Trung bình',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    ingredients: [
      { name: 'thịt bò', quantity: 300, unit: 'gram' },
      { name: 'khoai tây', quantity: 2, unit: 'củ' },
      { name: 'hành tây', quantity: 1, unit: 'củ' },
      { name: 'tỏi', quantity: 1, unit: 'củ' },
      { name: 'dầu hào', quantity: 2, unit: 'muỗng canh' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Thịt bò thái vuông quân cờ 2cm, ướp với dầu hào và tỏi băm trong 15 phút.',
        imageUrl: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500',
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Khoai tây gọt vỏ, cắt thanh dài rồi chiên vàng giòn.',
        imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Áp chảo thịt bò với lửa lớn cùng hành tây trong 3 phút để thịt mềm mọng.',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
        timerMinutes: 3
      }
    ],
    status: 'approved',
    avgRating: 4.8,
    ratingCount: 12
  },
  {
    _id: 'r2',
    title: 'Canh cà chua trứng vân mây',
    author: { _id: 'u2', name: 'Trần Đăng Dương' },
    category: { _id: 'cat2', name: 'Món canh' },
    cookTime: 10,
    difficulty: 'Dễ',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
    ingredients: [
      { name: 'trứng gà', quantity: 2, unit: 'quả' },
      { name: 'cà chua', quantity: 2, unit: 'quả' },
      { name: 'hành lá', quantity: 1, unit: 'bó' },
      { name: 'nước lọc', quantity: 500, unit: 'ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cà chua thái múi cau, xào mềm với một chút dầu ăn.',
        imageUrl: '',
        timerMinutes: 3
      },
      {
        stepNumber: 2,
        instruction: 'Đổ 500ml nước vào đun sôi, khuấy đều trứng gà theo chiều kim đồng hồ rồi rắc hành lá.',
        imageUrl: '',
        timerMinutes: 5
      }
    ],
    status: 'approved',
    avgRating: 4.5,
    ratingCount: 8
  },
  {
    _id: 'r3',
    title: 'Mì Ý sốt bò bằm (Spaghetti Bolognese)',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat1', name: 'Món chính' },
    cookTime: 40,
    difficulty: 'Trung bình',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?w=600',
    ingredients: [
      { name: 'thịt bò', quantity: 200, unit: 'gram' },
      { name: 'cà chua', quantity: 3, unit: 'quả' },
      { name: 'mì ý', quantity: 200, unit: 'gram' },
      { name: 'hành tây', quantity: 1, unit: 'củ' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Luộc mì Ý trong nước sôi có pha chút muối khoảng 8 phút.',
        imageUrl: '',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'Xào thịt bò bằm với sốt cà chua và hành tây băm nhỏ cho sệt lại.',
        imageUrl: '',
        timerMinutes: 15
      }
    ],
    status: 'pending',
    avgRating: 0,
    ratingCount: 0
  }
];