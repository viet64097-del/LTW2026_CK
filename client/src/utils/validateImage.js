const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 2 * 1024 * 1024;

export function validateImageFile(file) {
  if (!file) {
    return { valid: false, message: 'Chưa chọn tệp ảnh nào.' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: 'Định dạng ảnh không hợp lệ! Chỉ chấp nhận JPG, PNG hoặc WEBP.'
    };
  }

  if (file.size > MAX_SIZE_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      message: `Dung lượng ảnh quá lớn (${sizeMB}MB). Vui lòng chọn ảnh tối đa 2MB.`
    };
  }

  return { valid: true, message: '' };
}