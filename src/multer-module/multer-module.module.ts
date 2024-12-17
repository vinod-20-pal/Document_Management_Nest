import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports: [
      MulterModule.register({
        storage: diskStorage({
          destination: './uploads', // Folder where files will be stored
          filename: (req, file, cb) => {
            // Generate a unique filename
            const ext = extname(file.originalname); // Get file extension
            cb(null, `${file.fieldname}-${ext}`);
          },
        }),
      }),
      ],
})
export class MulterModuleModule {}
