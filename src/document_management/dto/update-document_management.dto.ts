import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentManagementDto } from './create-document_management.dto';

export class UpdateDocumentManagementDto extends PartialType(CreateDocumentManagementDto) {}
