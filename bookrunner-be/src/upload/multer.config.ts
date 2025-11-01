import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const multerConfig: MulterOptions = {
  storage: multer.diskStorage({
    destination: './uploads',  // Chọn thư mục lưu tệp tin
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);  // Đặt tên tệp tin dựa trên thời gian và tên gốc
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(new Error('Chỉ hỗ trợ ảnh JPG, JPEG, PNG!'), false);
    }
    cb(null, true);
  },
};
