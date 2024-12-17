import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { JwtModuleModule } from 'src/jwt-module/jwt-module.module';
import { StoreToken } from './entities/storeToken.entity';

@Module({
  imports: [JwtModuleModule,
    TypeOrmModule.forFeature([Auth]),
    TypeOrmModule.forFeature([StoreToken])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule, AuthService]
})
export class AuthModule {}
