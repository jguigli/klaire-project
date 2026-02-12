import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentEntity } from './document/document.entity';
import { DocumentStatus } from './document/document.status';
import { DocumentCreate } from './document/document.create';
import { DocumentStats } from './document/document.stats';

@Controller('documents')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  // @HttpCode(204)
  createDocuments(@Body() postDoc: DocumentCreate ) {
    return this.appService.createDocuments(postDoc);
  }
  
  @Get()
  getDocuments(): Promise<DocumentEntity[]> {
    return this.appService.getDocuments();
  }

  @Patch(':id')
  patchDocuments(@Param('id') id: number, @Query('status') status: DocumentStatus) {
    return this.appService.patchDocuments(id, status);
  }

  @Get('/stats')
  getStatsDocuments(): Promise<DocumentStats[]> {
    return this.appService.getStatsDocuments();
  }
}
