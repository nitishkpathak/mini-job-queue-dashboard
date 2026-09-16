import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { JobStatus } from '../common/enums/job-status.enum';
import { Job } from './entities/job.entity';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully', type: Job })
  async create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs, optionally filtered by status' })
  @ApiQuery({ name: 'status', enum: JobStatus, required: false })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  async findAll(@Query('status') status?: JobStatus): Promise<Job[]> {
    return await this.jobsService.findAll(status);
  }

  @Get('counts')
  @ApiOperation({ summary: 'Get status counts summary' })
  @ApiResponse({ status: 200, description: 'Counts for each job status' })
  async getCounts() {
    return await this.jobsService.getStatusCounts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Job details', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async findOne(@Param('id') id: string): Promise<Job> {
    return await this.jobsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update job status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully', type: Job })
  @ApiResponse({ status: 400, description: 'Invalid state transition' })
  @ApiResponse({ status: 409, description: 'Concurrent update conflict' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateJobStatusDto: UpdateJobStatusDto,
  ): Promise<Job> {
    return await this.jobsService.updateStatus(id, updateJobStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a job' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async remove(@Param('id') id: string) {
    return await this.jobsService.remove(id);
  }
}
