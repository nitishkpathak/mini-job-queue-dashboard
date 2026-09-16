import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ description: 'Title of the job', example: 'Process PDF Invoices' })
  @IsNotEmpty({ message: 'Job title is required' })
  @IsString({ message: 'Job title must be a string' })
  @MaxLength(100, { message: 'Job title cannot exceed 100 characters' })
  title: string;

  @ApiProperty({ description: 'Type of job', example: 'DOCUMENT_PROCESSING' })
  @IsNotEmpty({ message: 'Job type is required' })
  @IsString({ message: 'Job type must be a string' })
  @MaxLength(50, { message: 'Job type cannot exceed 50 characters' })
  type: string;
}
