import { Test, TestingModule } from '@nestjs/testing';
import { DocumentManagementController } from './document_management.controller';
import { DocumentManagementService } from './document_management.service';

describe('DocumentManagementController', () => {
  let controller: DocumentManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentManagementController],
      providers: [DocumentManagementService],
    }).compile();

    controller = module.get<DocumentManagementController>(DocumentManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
