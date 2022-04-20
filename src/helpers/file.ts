import * as path from 'path';
import { v4 as uuid } from 'uuid';

export const customFileName = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const filename = uuid() + ext;
  cb(null, filename);
};
