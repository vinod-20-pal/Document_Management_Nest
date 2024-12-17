import { Module } from '@nestjs/common';
import { DocumentManagementService } from './document_management.service';
import { DocumentManagementController } from './document_management.controller';
import { DocumentManagement } from './entities/document_management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModuleModule } from 'src/jwt-module/jwt-module.module';

@Module({
  imports: [JwtModuleModule,
    TypeOrmModule.forFeature([DocumentManagement]),

  ],
  controllers: [DocumentManagementController],
  providers: [DocumentManagementService],
  exports: [TypeOrmModule, DocumentManagementService]

})
export class DocumentManagementModule {}
