import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  @Get(':fileName')
  getFile(@Param() params): StreamableFile {
    const { fileName } = params;

    const file = createReadStream(
      join(process.cwd(), `dist/uploads/${fileName}`),
    );
    return new StreamableFile(file);
  }
}
