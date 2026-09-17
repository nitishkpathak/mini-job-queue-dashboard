import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobStatus } from '../common/enums/job-status.enum';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { ALLOWED_TRANSITIONS, JOB_MESSAGES } from './jobs.constants';

@Injectable()
export class JobsService implements OnModuleInit {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async onModuleInit() {
    const count = await this.jobRepository.count();
    if (count === 0) {
      await this.jobRepository.save([
        this.jobRepository.create({
          title: 'Import Customer Records',
          type: 'Data Import',
          status: JobStatus.PENDING,
        }),
        this.jobRepository.create({
          title: 'Generate Monthly Invoice PDF',
          type: 'Report Generation',
          status: JobStatus.RUNNING,
        }),
        this.jobRepository.create({
          title: 'Sync Inventory Data',
          type: 'Data Sync',
          status: JobStatus.COMPLETED,
        }),
      ]);
    }
  }

  /**
   * Helper method to validate status transition rules
   */
  public validateStatusTransition(currentStatus: JobStatus, targetStatus: JobStatus): void {
    if (currentStatus === targetStatus) {
      return; // Idempotent check
    }

    const validNextStates = ALLOWED_TRANSITIONS[currentStatus] || [];
    if (!validNextStates.includes(targetStatus)) {
      throw new BadRequestException(
        JOB_MESSAGES.INVALID_TRANSITION(currentStatus, targetStatus, validNextStates),
      );
    }
  }

  /**
   * Create a new job with initial status 'pending'
   */
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      title: createJobDto.title,
      type: createJobDto.type,
      status: JobStatus.PENDING,
    });
    return await this.jobRepository.save(job);
  }

  /**
   * Get all jobs with optional status filter
   */
  async findAll(statusFilter?: JobStatus): Promise<Job[]> {
    if (statusFilter) {
      return await this.jobRepository.find({
        where: { status: statusFilter },
        order: { createdAt: 'DESC' },
      });
    }
    return await this.jobRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get single job by ID
   */
  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(JOB_MESSAGES.NOT_FOUND(id));
    }
    return job;
  }

  /**
   * Update job status with state machine checks and atomic DB condition query
   */
  async updateStatus(id: string, updateJobStatusDto: UpdateJobStatusDto): Promise<Job> {
    const targetStatus = updateJobStatusDto.status;

    // 1. Get current job state
    const currentJob = await this.findOne(id);

    // 2. Validate status transition using helper method
    this.validateStatusTransition(currentJob.status, targetStatus);

    // If identical, return existing job
    if (currentJob.status === targetStatus) {
      return currentJob;
    }

    // 3. Concurrency Protection: Atomic Conditional Update
    const result = await this.jobRepository
      .createQueryBuilder()
      .update(Job)
      .set({ status: targetStatus })
      .where('id = :id AND status = :expectedStatus', {
        id,
        expectedStatus: currentJob.status,
      })
      .execute();

    if (result.affected === 0) {
      const latestJobState = await this.jobRepository.findOne({ where: { id } });
      if (!latestJobState) {
        throw new NotFoundException(JOB_MESSAGES.NOT_FOUND(id));
      }
      throw new ConflictException(JOB_MESSAGES.CONCURRENCY_CONFLICT(latestJobState.status));
    }

    return await this.findOne(id);
  }

  /**
   * Delete job by ID
   */
  async remove(id: string): Promise<{ message: string }> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
    return { message: JOB_MESSAGES.DELETED_SUCCESS(id) };
  }

  /**
   * Status aggregate counts
   */
  async getStatusCounts(): Promise<Record<string, number>> {
    const jobs = await this.jobRepository.find();
    const counts = {
      total: jobs.length,
      [JobStatus.PENDING]: 0,
      [JobStatus.RUNNING]: 0,
      [JobStatus.COMPLETED]: 0,
      [JobStatus.FAILED]: 0,
    };

    jobs.forEach((job) => {
      if (counts[job.status] !== undefined) {
        counts[job.status]++;
      }
    });

    return counts;
  }
}
