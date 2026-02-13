import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { DocumentEntity } from 'src/document/document.entity';
import { DocumentStatus } from 'src/document/document.status';

// Tests with AI helpfulness

// Mock du DataSource entier - must be at top level
jest.mock('src/dataSource', () => {
  const mockMgr = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
  };
  return {
    AppDataSource: {
      get manager() {
        return mockMgr;
      },
    },
  };
});

// Import after mock to get the mocked version
import { AppDataSource } from 'src/dataSource';

// Type for the mock manager
type MockManager = {
  create: jest.Mock;
  save: jest.Mock;
  find: jest.Mock;
  findOneBy: jest.Mock;
  createQueryBuilder: jest.Mock;
};

describe('AppController & AppService', () => {
  let appService: AppService;
  let appController: AppController;
  let mockMgr: MockManager;

  beforeEach(async () => {
    // Get the mock manager from the mocked module
    mockMgr = (AppDataSource as any).manager;
    // Reset all mocks before each test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------
  // Tests createDocuments
  // -----------------------------
  describe('createDocuments', () => {
    it('should create and save a document', async () => {
      const postDoc = { fileName: 'Doc1', pageCount: 3, status: DocumentStatus.PENDING, metadata: JSON.parse(JSON.stringify({source: "test"})) };
      const createdDoc = { id: 1, ...postDoc };

      mockMgr.create.mockReturnValue(createdDoc);
      mockMgr.save.mockResolvedValue(createdDoc);

      const result = await appService.createDocuments(postDoc);

      expect(mockMgr.create).toHaveBeenCalledWith(DocumentEntity, postDoc);
      expect(mockMgr.save).toHaveBeenCalledWith(createdDoc);
      expect(result).toEqual(createdDoc);
    });

    it('should throw error if pageCount < 1', async () => {
      const postDoc = { fileName: 'Doc1', pageCount: 0, status: DocumentStatus.PENDING, metadata: JSON.parse(JSON.stringify({source: "test"})) };

      await expect(appService.createDocuments(postDoc)).rejects.toThrow('Page count must be greater than 0');
    });
  });

  // -----------------------------
  // Tests getDocuments
  // -----------------------------
  describe('getDocuments', () => {
    it('should return all documents', async () => {
      const docs = [{ id: 1 }, { id: 2 }];
      mockMgr.find.mockResolvedValue(docs);

      const result = await appService.getDocuments();

      expect(mockMgr.find).toHaveBeenCalledWith(DocumentEntity, { order: { createdAt: 'ASC' } });
      expect(result).toEqual(docs);
    });
  });

  // -----------------------------
  // Tests patchDocuments
  // -----------------------------
  describe('patchDocuments', () => {
    it('should update the status of a document', async () => {
      const doc = { id: 1, status: DocumentStatus.PENDING };
      mockMgr.findOneBy.mockResolvedValue(doc);
      mockMgr.save.mockResolvedValue({ ...doc, status: DocumentStatus.PROCESSED });

      await appService.patchDocuments(1, DocumentStatus.PROCESSED);

      expect(mockMgr.findOneBy).toHaveBeenCalledWith(DocumentEntity, { id: 1 });
      expect(mockMgr.save).toHaveBeenCalledWith({ ...doc, status: DocumentStatus.PROCESSED });
    });

    it('should throw error if document not found', async () => {
      mockMgr.findOneBy.mockResolvedValue(null);

      await expect(appService.patchDocuments(1, DocumentStatus.PROCESSED))
        .rejects.toThrow('Document with id: ${id} not found');
    });
  });

  // -----------------------------
  // Tests getStatsDocuments
  // -----------------------------
  describe('getStatsDocuments', () => {
    it('should return aggregated stats', async () => {
      const queryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([{ status: 'draft', total_pages: '5' }]),
      };

      mockMgr.createQueryBuilder.mockReturnValue(queryBuilderMock);

      const result = await appService.getStatsDocuments();

      expect(mockMgr.createQueryBuilder).toHaveBeenCalledWith(DocumentEntity, 'document');
      expect(result).toEqual([{ status: 'draft', total_pages: '5' }]);
    });
  });
});
