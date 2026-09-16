import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '../../common/enums/job-status.enum';

export class UpdateJobStatusDto {
  @ApiProperty({
    description: 'New status for the job',
    enum: JobStatus,
    example: JobStatus.RUNNING,
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(JobStatus, {
    message: 'Status must be one of: pending, running, completed, failed',
  })
  status: JobStatus;
}
