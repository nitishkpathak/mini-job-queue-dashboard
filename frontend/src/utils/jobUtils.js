export const JOB_STATUSES = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const ALLOWED_TRANSITIONS = {
  [JOB_STATUSES.PENDING]: [JOB_STATUSES.RUNNING],
  [JOB_STATUSES.RUNNING]: [JOB_STATUSES.COMPLETED, JOB_STATUSES.FAILED],
  [JOB_STATUSES.COMPLETED]: [],
  [JOB_STATUSES.FAILED]: [],
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case JOB_STATUSES.PENDING:
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case JOB_STATUSES.RUNNING:
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse';
    case JOB_STATUSES.COMPLETED:
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case JOB_STATUSES.FAILED:
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-800 text-slate-400 border-slate-700';
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
