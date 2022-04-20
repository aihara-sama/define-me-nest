import {
  Controller,
  HttpCode,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { customFileName } from './helpers/file';

@Controller()
export class AppController {
  @Post('me')
  me() {
    return {
      me: true,
    };
  }
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: customFileName,
      }),
    }),
  )
  @Put('file')
  @HttpCode(200)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename,
    };
  }
}
