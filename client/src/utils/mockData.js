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
        imageUrl: '',
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Khoai tây gọt vỏ, cắt thanh dài rồi chiên vàng giòn.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Áp chảo thịt bò với lửa lớn cùng hành tây trong 3 phút để thịt mềm mọng.',
        imageUrl: '',
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
  },
  {
    _id: 'r4',
    title: 'Thịt kho tàu trứng cút',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat1', name: 'Món chính' },
    cookTime: 45,
    difficulty: 'Trung bình',
    servings: 4,
    thumbnail: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600',
    ingredients: [
      { name: 'thịt ba chỉ', quantity: 500, unit: 'gram' },
      { name: 'trứng cút', quantity: 15, unit: 'quả' },
      { name: 'nước dừa tươi', quantity: 300, unit: 'ml' },
      { name: 'nước mắm', quantity: 3, unit: 'muỗng canh' },
      { name: 'hành tím', quantity: 2, unit: 'củ' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Rửa sạch thịt ba chỉ, cắt miếng vuông vừa ăn rồi ướp với nước mắm và hành tím băm.',
        imageUrl: '',
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Luộc chín trứng cút, ngâm nước lạnh rồi bóc sạch vỏ.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Đảo săn thịt với nước màu, đổ nước dừa tươi vào kho lửa nhỏ cùng trứng cút đến khi thịt mềm.',
        imageUrl: '',
        timerMinutes: 25
      }
    ],
    status: 'approved',
    avgRating: 4.9,
    ratingCount: 19
  },
  {
    _id: 'r5',
    title: 'Canh bí đỏ nấu thịt bằm',
    author: { _id: 'u2', name: 'Trần Đăng Dương' },
    category: { _id: 'cat2', name: 'Món canh' },
    cookTime: 20,
    difficulty: 'Dễ',
    servings: 3,
    thumbnail: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600',
    ingredients: [
      { name: 'bí đỏ', quantity: 350, unit: 'gram' },
      { name: 'thịt heo bằm', quantity: 150, unit: 'gram' },
      { name: 'hành lá', quantity: 1, unit: 'bó' },
      { name: 'nước mắm', quantity: 1, unit: 'muỗng canh' },
      { name: 'hành tím', quantity: 1, unit: 'củ' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Gọt vỏ bí đỏ, rửa sạch và cắt miếng vừa ăn.',
        imageUrl: '',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Phi thơm hành tím, xào săn thịt bằm với chút nước mắm rồi đổ 800ml nước vào đun sôi.',
        imageUrl: '',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        instruction: 'Cho bí đỏ vào nấu chín mềm, nêm lại gia vị và rắc hành lá trước khi tắt bếp.',
        imageUrl: '',
        timerMinutes: 10
      }
    ],
    status: 'approved',
    avgRating: 4.6,
    ratingCount: 11
  },
  {
    _id: 'r6',
    title: 'Khoai tây lắc phô mai giòn rụm',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat3', name: 'Món ăn sáng' },
    cookTime: 25,
    difficulty: 'Dễ',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
    ingredients: [
      { name: 'khoai tây', quantity: 3, unit: 'củ' },
      { name: 'bột phô mai', quantity: 3, unit: 'muỗng canh' },
      { name: 'bột bắp', quantity: 2, unit: 'muỗng canh' },
      { name: 'dầu ăn', quantity: 200, unit: 'ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Gọt vỏ khoai tây, cắt thanh dài, ngâm nước muối loãng rồi để ráo.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Áo đều khoai với bột bắp rồi chiên ngập dầu đến khi vàng giòn.',
        imageUrl: '',
        timerMinutes: 12
      },
      {
        stepNumber: 3,
        instruction: 'Vớt khoai ra giấy thấm dầu, cho vào hộp cùng bột phô mai và lắc đều.',
        imageUrl: '',
        timerMinutes: 3
      }
    ],
    status: 'approved',
    avgRating: 4.7,
    ratingCount: 15
  },
  {
    _id: 'r7',
    title: 'Chè khúc bạch hạnh nhân',
    author: { _id: 'u2', name: 'Trần Đăng Dương' },
    category: { _id: 'cat4', name: 'Tráng miệng' },
    cookTime: 60,
    difficulty: 'Khó',
    servings: 4,
    thumbnail: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600',
    ingredients: [
      { name: 'sữa tươi không đường', quantity: 250, unit: 'ml' },
      { name: 'whipping cream', quantity: 250, unit: 'ml' },
      { name: 'bột gelatin', quantity: 15, unit: 'gram' },
      { name: 'hạnh nhân lát', quantity: 50, unit: 'gram' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Ngâm nở bột gelatin với nước lạnh, sau đó đun ấm sữa tươi, whipping cream và hòa tan gelatin.',
        imageUrl: '',
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Đổ hỗn hợp vào khuôn, để ngăn mát tủ lạnh ít nhất 3 tiếng cho đông lại rồi cắt viên vuông.',
        imageUrl: '',
        timerMinutes: 35
      },
      {
        stepNumber: 3,
        instruction: 'Nấu nước đường phèn để nguội, rang vàng hạnh nhân lát rồi cho khúc bạch vào thưởng thức lạnh.',
        imageUrl: '',
        timerMinutes: 10
      }
    ],
    status: 'approved',
    avgRating: 4.9,
    ratingCount: 24
  },
  {
    _id: 'r8',
    title: 'Phở gà Hà Nội',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat3', name: 'Món ăn sáng' },
    cookTime: 45,
    difficulty: 'Trung bình',
    servings: 3,
    thumbnail: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600',
    ingredients: [
      { name: 'thịt gà', quantity: 500, unit: 'gram' },
      { name: 'bánh phở', quantity: 400, unit: 'gram' },
      { name: 'hành tây', quantity: 1, unit: 'củ' },
      { name: 'hành lá', quantity: 1, unit: 'bó' },
      { name: 'nước mắm', quantity: 2, unit: 'muỗng canh' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Luộc chín thịt gà cùng hành tây nướng thơm, vớt gà ra xé phay vừa ăn.',
        imageUrl: '',
        timerMinutes: 25
      },
      {
        stepNumber: 2,
        instruction: 'Nêm nước luộc gà với nước mắm và gia vị cho thanh ngọt, đun sôi nhẹ.',
        imageUrl: '',
        timerMinutes: 15
      },
      {
        stepNumber: 3,
        instruction: 'Chần bánh phở qua nước sôi, xếp thịt gà, hành lá lên trên rồi chan nước dùng nóng.',
        imageUrl: '',
        timerMinutes: 5
      }
    ],
    status: 'approved',
    avgRating: 4.8,
    ratingCount: 21
  },
  {
    _id: 'r9',
    title: 'Cơm chiên Dương Châu',
    author: { _id: 'u2', name: 'Trần Đăng Dương' },
    category: { _id: 'cat1', name: 'Món chính' },
    cookTime: 20,
    difficulty: 'Dễ',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600',
    ingredients: [
      { name: 'cơm nguội', quantity: 400, unit: 'gram' },
      { name: 'trứng gà', quantity: 2, unit: 'quả' },
      { name: 'lạp xưởng', quantity: 100, unit: 'gram' },
      { name: 'hành lá', quantity: 1, unit: 'bó' },
      { name: 'tỏi', quantity: 1, unit: 'củ' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cắt hạt lựu lạp xưởng, đánh tan trứng gà rồi trộn đều một nửa vào cơm nguội.',
        imageUrl: '',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Phi thơm tỏi, xào chín lạp xưởng rồi cho cơm vào đảo đều tay trên lửa lớn cho hạt cơm săn tơi.',
        imageUrl: '',
        timerMinutes: 12
      },
      {
        stepNumber: 3,
        instruction: 'Nêm gia vị vừa ăn, rắc hành lá cắt nhỏ rồi đảo thêm 1 phút là hoàn thành.',
        imageUrl: '',
        timerMinutes: 3
      }
    ],
    status: 'approved',
    avgRating: 4.7,
    ratingCount: 16
  },
  {
    _id: 'r10',
    title: 'Cánh gà chiên nước mắm',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat1', name: 'Món chính' },
    cookTime: 35,
    difficulty: 'Trung bình',
    servings: 3,
    thumbnail: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600',
    ingredients: [
      { name: 'cánh gà', quantity: 600, unit: 'gram' },
      { name: 'nước mắm', quantity: 3, unit: 'muỗng canh' },
      { name: 'tỏi', quantity: 1, unit: 'củ' },
      { name: 'dầu ăn', quantity: 200, unit: 'ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Rửa sạch cánh gà với muối, chặt khúc vừa ăn và để thật ráo nước.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Chiên cánh gà ngập dầu ở lửa vừa đến khi lớp da vàng giòn rồi vớt ra giấy thấm dầu.',
        imageUrl: '',
        timerMinutes: 15
      },
      {
        stepNumber: 3,
        instruction: 'Phi thơm tỏi băm, cho hỗn hợp nước mắm pha đường vào đun sệt rồi đảo đều cánh gà cho áo sốt.',
        imageUrl: '',
        timerMinutes: 10
      }
    ],
    status: 'approved',
    avgRating: 4.9,
    ratingCount: 28
  },
  {
    _id: 'r11',
    title: 'Canh chua cá lóc miền Tây',
    author: { _id: 'u2', name: 'Trần Đăng Dương' },
    category: { _id: 'cat2', name: 'Món canh' },
    cookTime: 30,
    difficulty: 'Trung bình',
    servings: 4,
    thumbnail: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600',
    ingredients: [
      { name: 'cá lóc', quantity: 500, unit: 'gram' },
      { name: 'cà chua', quantity: 2, unit: 'quả' },
      { name: 'dứa', quantity: 200, unit: 'gram' },
      { name: 'nước mắm', quantity: 2, unit: 'muỗng canh' },
      { name: 'nước lọc', quantity: 1000, unit: 'ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Làm sạch cá lóc, cắt khứa vừa ăn và ướp nhẹ với 1 muỗng nước mắm.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Đun sôi nước lọc với nước cốt me, cho cá lóc vào nấu chín rồi thêm cà chua và dứa.',
        imageUrl: '',
        timerMinutes: 15
      },
      {
        stepNumber: 3,
        instruction: 'Nêm lại vị chua ngọt vừa miệng, thêm rau thơm rồi tắt bếp.',
        imageUrl: '',
        timerMinutes: 5
      }
    ],
    status: 'approved',
    avgRating: 4.6,
    ratingCount: 14
  },
  {
    _id: 'r12',
    title: 'Bánh mì ốp la pate',
    author: { _id: 'u1', name: 'Nguyễn Tiến Đức' },
    category: { _id: 'cat3', name: 'Món ăn sáng' },
    cookTime: 10,
    difficulty: 'Dễ',
    servings: 1,
    thumbnail: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600',
    ingredients: [
      { name: 'trứng gà', quantity: 2, unit: 'quả' },
      { name: 'pate gan', quantity: 50, unit: 'gram' },
      { name: 'cà chua', quantity: 1, unit: 'quả' },
      { name: 'hành lá', quantity: 1, unit: 'bó' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Làm nóng chảo với chút dầu ăn, ốp la 2 quả trứng gà lòng đào vừa ý.',
        imageUrl: '',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Áp chảo nhanh pate cho thơm, bày ra đĩa cùng cà chua cắt lát và thưởng thức với bánh mì nóng.',
        imageUrl: '',
        timerMinutes: 5
      }
    ],
    status: 'approved',
    avgRating: 4.5,
    ratingCount: 10
  },
  {
    _id: 'r13',
    title: 'Bánh flan caramel mềm mịn',
    author: { _id: 'u2', name: 'Trần Đăng Dương' },
    category: { _id: 'cat4', name: 'Tráng miệng' },
    cookTime: 50,
    difficulty: 'Trung bình',
    servings: 4,
    thumbnail: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600',
    ingredients: [
      { name: 'trứng gà', quantity: 4, unit: 'quả' },
      { name: 'sữa tươi không đường', quantity: 400, unit: 'ml' },
      { name: 'sữa đặc', quantity: 100, unit: 'ml' },
      { name: 'vani', quantity: 1, unit: 'muỗng cà phê' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Thắng đường thành caramel màu cánh gián rồi tráng đều dưới đáy khuôn.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Đánh nhẹ trứng gà với sữa tươi, sữa đặc và vani rồi lọc qua rây cho thật mịn.',
        imageUrl: '',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Đổ hỗn hợp vào khuôn và hấp cách thủy ở lửa nhỏ trong 30 phút cho bánh chín mịn không rỗ.',
        imageUrl: '',
        timerMinutes: 30
      }
    ],
    status: 'approved',
    avgRating: 4.9,
    ratingCount: 22
  }
];