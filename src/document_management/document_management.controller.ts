import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { DocumentManagementService } from './document_management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuardGuard } from 'src/guard/role-guard/role-guard.guard';
import { Roles } from './decorators/role.decorator';
import { UserRole } from './dto/create-document_management.dto';

@Controller('documents')
@UseGuards(RoleGuardGuard)
export class DocumentManagementController {
  constructor(private readonly documentManagementService: DocumentManagementService) {}

  @Post('upload')
  @Roles(UserRole.EDITOR, UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async createDocument(
    @Body() body: { title: string; description: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentManagementService.createDocument(body, file);
  }

  @Get()
  @Roles(UserRole.VIEWER, UserRole.EDITOR, UserRole.ADMIN)
  async findAllDocuments() {
    return this.documentManagementService.findAllDocuments();
  }

  @Patch('update/:id')
  @Roles(UserRole.EDITOR, UserRole.ADMIN)
  async updateDocument(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string },
  ) {
    return this.documentManagementService.updateDocument(id, body);
  }

  @Delete('delete/:id')
  @Roles(UserRole.ADMIN)
  async deleteDocument(@Param('id') id: number) {
    return this.documentManagementService.deleteDocument(id);
  }
}
