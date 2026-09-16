import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '..', 'data', 'jobs.sqlite'),
      entities: [Job],
      synchronize: true, // Automatically sync DB schema in development
    }),
    JobsModule,
  ],
})
export class AppModule {}
