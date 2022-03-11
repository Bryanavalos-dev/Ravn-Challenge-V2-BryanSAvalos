import { BadRequestException } from '@nestjs/common';
import * as generateUniqueId from 'generate-unique-id';

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException('The image format are invalid.'));
  }

  callback(null, true);
};

export const fileName = (req, file, callback) => {
  console.log(file);
  const randomName = generateUniqueId();
  callback(null, `${randomName}.jpg`);
};
