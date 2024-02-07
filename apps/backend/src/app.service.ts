import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getHello(): Promise<string> {
    await this.dataSource.query('SELECT 1');
    return 'Hello World!';
  }
}
