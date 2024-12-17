import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModuleModule } from './jwt-module/jwt-module.module';
import { DatabaseModule } from './provider/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DocumentManagementModule } from './document_management/document_management.module';
import { MulterModuleModule } from './multer-module/multer-module.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    DatabaseModule, 
    UserModule, 
    DocumentManagementModule, 
    MulterModuleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
