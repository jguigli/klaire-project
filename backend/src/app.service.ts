import { Injectable } from '@nestjs/common';
import { DocumentEntity } from './document/document.entity';
import { AppDataSource } from './dataSource';
import { DocumentStatus } from './document/document.status';
import { DocumentCreate } from './document/document.create';
import { DocumentStats } from './document/document.stats';

@Injectable()
export class AppService {
  
  async createDocuments(postDoc: DocumentCreate) {
    if (postDoc.pageCount < 1) throw new Error('Page count must be greater than 0')

    const document = AppDataSource.manager.create(DocumentEntity, {...postDoc});
    if (!document) throw new Error('Cannot create Document')
    return AppDataSource.manager.save(document);
  }

  async getDocuments(): Promise<DocumentEntity[]> {
    return AppDataSource.manager.find(DocumentEntity, {order: {createdAt: "ASC"}});
  }

  async patchDocuments(id: number, status: DocumentStatus) {
    const document = await AppDataSource.manager.findOneBy(DocumentEntity, {id: id})
    if (!document) throw new Error('Document with id: ${id} not found')

    document.status = status;
    await AppDataSource.manager.save(document)
  }
  
  async getStatsDocuments(): Promise<DocumentStats[]> {
    const result = await AppDataSource.manager
      .createQueryBuilder(DocumentEntity, 'document')
      .select('document.status', 'status')
      .addSelect('SUM(document.pageCount)', 'total_pages')
      .groupBy('document.status')
      .getRawMany();
    return result;
  }
}
