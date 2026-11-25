# Sổ Tay Nấu Ăn

Ứng dụng React để khám phá công thức và tìm món theo nguyên liệu, với máy chủ Express và cơ sở dữ liệu MongoDB.

## Chạy dự án

Cần Node.js 20.19 trở lên và một MongoDB đang chạy.

1. Từ thư mục gốc, cài đặt và cấu hình máy chủ.

   ```bash
   cd server
   npm install
   cp -n .env.example .env
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Điền giá trị vừa tạo vào `JWT_SECRET` trong `server/.env`. Dùng `MONGODB_URI` để chọn cơ sở dữ liệu. Tệp mẫu trỏ tới MongoDB cục bộ.

2. Khởi động máy chủ từ thư mục `server`.

   ```bash
   npm start
   ```

3. Mở một terminal khác tại thư mục gốc và khởi động giao diện.

   ```bash
   cd client
   npm ci
   npm start
   ```

   Giao diện chạy mặc định tại [localhost:3000](http://localhost:3000). Nếu API chạy ở địa chỉ khác, đặt `REACT_APP_API_URL` trong `client/.env.local`, ví dụ `http://localhost:5001/api`, rồi khởi động lại giao diện.

## Dữ liệu mẫu

Đặt `MONGODB_URI` trong `server/.env` tới một cơ sở dữ liệu demo trống, ví dụ `mongodb://127.0.0.1:27017/recipe_app_demo`. Từ thư mục `server`, chạy `node seed.js` để tạo tài khoản, loại món, công thức, đánh giá và thực đơn mẫu. Nếu muốn bắt đầu lại từ bộ dữ liệu ban đầu, dùng một tên cơ sở dữ liệu demo mới.

| Vai trò | Cách truy cập | Mật khẩu demo |
| --- | --- | --- |
| Khách | Mở trang chủ | — |
| Thành viên | `member1@gmail.com` hoặc `member2@gmail.com` | `123456` |
| Admin | `admin@gmail.com` | `123456` |

## Kiểm tra

Chạy từ thư mục `client`.

```bash
npm test -- --watchAll=false --runInBand
CI=true npm run build
```

Đăng nhập, đăng ký và kiểm duyệt bình luận trong tab Admin dùng API thật. Màn hình công thức, yêu thích, đánh giá của thành viên và các tab Admin còn lại dùng dữ liệu mẫu. Thực đơn tuần được lưu trong trình duyệt, hỗ trợ tạo danh sách đi chợ và in hoặc xuất PDF.
