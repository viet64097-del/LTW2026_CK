require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./src/config/db');

// Import 5 models
const User = require('./models/User');
const Category = require('./models/Category');
const Recipe = require('./models/Recipe');
const Review = require('./models/Review');
const MealPlan = require('./models/MealPlan');

const seedData = async () => {
    try {
        await connectDB();

        const models = [User, Category, Recipe, Review, MealPlan];
        const existingData = await Promise.all(models.map((model) => model.exists({})));
        if (existingData.some(Boolean)) {
            throw new Error('Cơ sở dữ liệu đã có dữ liệu. Hãy chọn một cơ sở dữ liệu thử nghiệm trống.');
        }

        // 3. Tạo tài khoản mẫu (Mật khẩu chung: 123456)
        const salt = await bcrypt.genSalt(10);
        const defaultPassword = await bcrypt.hash('123456', salt);

        const createdUsers = await User.insertMany([
            {
                name: 'Quản trị viên (Admin)',
                email: 'admin@gmail.com',
                passwordHash: defaultPassword,
                role: 'admin'
            },
            {
                name: 'Nguyễn Văn An',
                email: 'member1@gmail.com',
                passwordHash: defaultPassword,
                role: 'member'
            },
            {
                name: 'Trần Thị Bình',
                email: 'member2@gmail.com',
                passwordHash: defaultPassword,
                role: 'member'
            }
        ]);
        const [admin, member1, member2] = createdUsers;

        // 4. Tạo danh mục món ăn
        const createdCategories = await Category.insertMany([
            {
                name: 'Món mặn',
                slug: 'mon-man',
                description: 'Các món chính đậm đà dùng kèm cơm trắng'
            },
            {
                name: 'Món canh',
                slug: 'mon-canh',
                description: 'Các món canh thanh mát, giải nhiệt hàng ngày'
            },
            {
                name: 'Món ăn sáng',
                slug: 'mon-an-sang',
                description: 'Các món ăn sáng nhanh gọn, đủ dinh dưỡng'
            },
            {
                name: 'Đồ uống & Tráng miệng',
                slug: 'do-uong-trang-mieng',
                description: 'Trà, sinh tố và các món ngọt tráng miệng'
            }
        ]);
        const [catMan, catCanh, catSang] = createdCategories;

        // 5. Tạo công thức nấu ăn mẫu
        const createdRecipes = await Recipe.insertMany([
            {
                authorId: member1._id,
                categoryId: catMan._id,
                title: 'Thịt ba chỉ kho trứng cút',
                description: 'Món thịt kho tàu mềm rục, thấm đẫm gia vị, màu cánh gián đẹp mắt cực kỳ đưa cơm.',
                imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
                cookingTime: 45,
                servings: 4,
                difficulty: 'Dễ',
                ingredient: [
                    { name: 'Thịt ba chỉ', amount: 500, unit: 'gram' },
                    { name: 'Trứng cút', amount: 15, unit: 'quả' },
                    { name: 'Nước dừa tươi', amount: 300, unit: 'ml' },
                    { name: 'Hành tím', amount: 3, unit: 'củ' }
                ],
                steps: [
                    { name: 'Thịt ba chỉ rửa sạch, thái miếng vuông vừa ăn. Trứng cút luộc chín, bóc vỏ.', amount: 0 },
                    { name: 'Ướp thịt với nước mắm, đường, tiêu và hành tím băm trong 20 phút.', amount: 20 },
                    { name: 'Thắng nước màu, cho thịt vào đảo săn rồi đổ nước dừa tươi và trứng cút vào kho lửa nhỏ 30 phút.', amount: 30 }
                ],
                status: 'approved',
                averageRating: 5,
                reviewCount: 1
            },
            {
                authorId: member2._id,
                categoryId: catCanh._id,
                title: 'Canh chua cá lóc miền Tây',
                description: 'Vị chua thanh của me hòa quyện cùng thịt cá lóc ngọt tự nhiên và rau thơm.',
                imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
                cookingTime: 30,
                servings: 4,
                difficulty: 'Trung bình',
                ingredient: [
                    { name: 'Cá lóc', amount: 600, unit: 'gram' },
                    { name: 'Cà chua', amount: 2, unit: 'quả' },
                    { name: 'Dứa (thơm)', amount: 0.5, unit: 'quả' },
                    { name: 'Giá đỗ', amount: 150, unit: 'gram' }
                ],
                steps: [
                    { name: 'Cá lóc làm sạch nhớt, cắt khoanh dày 2cm. Cà chua bổ múi cau, dứa thái lát.', amount: 0 },
                    { name: 'Đun sôi nước cốt me, thả cá vào nấu chín rồi cho cà chua, dứa, giá đỗ vào.', amount: 0 },
                    { name: 'Nêm nếm gia vị vừa ăn, tắt bếp và rắc ngò gai, rau om thái nhỏ.', amount: 0 }
                ],
                status: 'approved',
                averageRating: 4,
                reviewCount: 1
            },
            {
                authorId: member1._id,
                categoryId: catSang._id,
                title: 'Bánh mì ốp la pate chảo gang',
                description: 'Bữa sáng kinh điển giòn rụm, béo ngậy chỉ mất 10 phút chuẩn bị.',
                imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414342d8?w=800',
                cookingTime: 10,
                servings: 1,
                difficulty: 'Dễ',
                ingredient: [
                    { name: 'Trứng gà', amount: 2, unit: 'quả' },
                    { name: 'Pate gan', amount: 50, unit: 'gram' },
                    { name: 'Bánh mì', amount: 1, unit: 'ổ' }
                ],
                steps: [
                    { name: 'Làm nóng chảo gang với một chút bơ lạt.', amount: 0 },
                    { name: 'Đập trứng gà và cho pate vào áp chảo đến khi lòng trắng chín giòn.', amount: 0 }
                ],
                status: 'pending', // Để sẵn 1 món chưa duyệt cho Admin test
                averageRating: 0,
                reviewCount: 0
            }
        ]);
        const [recipe1, recipe2, recipe3] = createdRecipes;

        // Cập nhật món yêu thích cho member1
        member1.favorites.push(recipe2._id);
        await member1.save();

        // 6. Tạo đánh giá & bình luận mẫu
        await Review.insertMany([
            {
                recipeId: recipe1._id,
                userId: member2._id,
                rating: 5,
                comment: 'Công thức chuẩn vị, thịt mềm và lên màu rất đẹp!'
            },
            {
                recipeId: recipe2._id,
                userId: member1._id,
                rating: 4,
                comment: 'Canh thanh mát, dễ nấu, cả nhà mình đều thích.'
            }
        ]);

        // 7. Tạo thực đơn mẫu cho member1 (ngày hôm nay)
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        await MealPlan.insertMany([
            {
                userId: member1._id,
                recipeId: recipe3._id,
                date: today,
                mealType: 'breakfast'
            },
            {
                userId: member1._id,
                recipeId: recipe1._id,
                date: today,
                mealType: 'lunch'
            },
            {
                userId: member1._id,
                recipeId: recipe2._id,
                date: today,
                mealType: 'lunch' // Cùng bữa trưa có 2 món để test tính năng nhiều món/bữa
            }
        ]);

        console.log('====================================');
        console.log('NẠP DỮ LIỆU MẪU THÀNH CÔNG!');
        console.log('Tài khoản Admin:  admin@gmail.com   / 123456');
        console.log('Tài khoản Member: member1@gmail.com / 123456');
        console.log('====================================');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi nạp dữ liệu mẫu:', error);
        process.exit(1);
    }
};

seedData();
