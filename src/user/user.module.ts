import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtModuleModule } from 'src/jwt-module/jwt-module.module';

@Module({
  imports: [JwtModuleModule,
    TypeOrmModule.forFeature([Auth])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
