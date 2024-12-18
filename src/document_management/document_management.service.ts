import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentManagement } from './entities/document_management.entity';

@Injectable()
export class DocumentManagementService {
  constructor(@InjectRepository(DocumentManagement)
  private readonly documentRepository: Repository<DocumentManagement>){}

  /**
   * Purpose : Upload document logic
   * @param body 
   * @param file 
   * @returns 
   */
  async createDocument(body: { title: string; description: string }, file: Express.Multer.File) {
    const newDocument = this.documentRepository.create({
      title: body.title,
      description: body.description,
      filePath: file.path, // File path saved after upload
    });
    return this.documentRepository.save(newDocument);
  }

  /**
   * Purpose : Find all the doucment logic
   * @returns 
   */
  async findAllDocuments() {
    return this.documentRepository.find();
  }

  /**
   * Purpose : Update document logic
   * @param id 
   * @param body 
   * @returns 
   */
  async updateDocument(id: number, body: { title?: string; description?: string }) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new Error('Document not found');
    }

    document.title = body.title || document.title;
    document.description = body.description || document.description;
    return this.documentRepository.save(document);
  }

  /**
   * Purpose : Delete document logic
   * @param id 
   * @returns 
   */
  async deleteDocument(id: number) {
    return this.documentRepository.delete(id);
  }
}
