import { JobStatus } from '../common/enums/job-status.enum';

export const ALLOWED_TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  [JobStatus.PENDING]: [JobStatus.RUNNING],
  [JobStatus.RUNNING]: [JobStatus.COMPLETED, JobStatus.FAILED],
  [JobStatus.COMPLETED]: [], // Terminal state
  [JobStatus.FAILED]: [],    // Terminal state
};

export const JOB_MESSAGES = {
  NOT_FOUND: (id: string) => `Job with ID "${id}" was not found`,
  INVALID_TRANSITION: (current: JobStatus, target: JobStatus, allowed: JobStatus[]) =>
    `Invalid status transition from '${current}' to '${target}'. Allowed transitions from '${current}': [${allowed.join(', ')}]`,
  CONCURRENCY_CONFLICT: (latestStatus: string) =>
    `Concurrent update detected: Job status was modified to '${latestStatus}' by another request.`,
  DELETED_SUCCESS: (id: string) => `Job with ID "${id}" has been deleted successfully`,
};
