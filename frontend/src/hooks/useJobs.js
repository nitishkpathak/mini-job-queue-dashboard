import { useState, useEffect, useCallback } from 'react';
import {
  fetchJobs,
  fetchJobCounts,
  createJob as apiCreateJob,
  updateJobStatus as apiUpdateStatus,
  deleteJob as apiDeleteJob,
} from '../services/jobApi';

const CACHE_JOBS_KEY = 'airth_mini_job_queue_jobs';
const CACHE_COUNTS_KEY = 'airth_mini_job_queue_counts';

const DEFAULT_INITIAL_JOBS = [
  { id: '8f7a401a-1234-4567-89ab-cdef01234567', title: 'Import Customer Records', type: 'Data Import', status: 'pending', createdAt: new Date().toISOString() },
  { id: '9e8b502b-2345-5678-90bc-def012345678', title: 'Generate Monthly Invoice PDF', type: 'Report Generation', status: 'running', createdAt: new Date().toISOString() },
  { id: '0a9c603c-3456-6789-01cd-ef0123456789', title: 'Sync Inventory Data', type: 'Data Sync', status: 'completed', createdAt: new Date().toISOString() },
];

const DEFAULT_INITIAL_COUNTS = { total: 3, pending: 1, running: 1, completed: 1, failed: 0 };

export function useJobs() {
  const [jobs, setJobs] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_JOBS_KEY);
      return cached ? JSON.parse(cached) : DEFAULT_INITIAL_JOBS;
    } catch {
      return DEFAULT_INITIAL_JOBS;
    }
  });

  const [counts, setCounts] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_COUNTS_KEY);
      return cached ? JSON.parse(cached) : DEFAULT_INITIAL_COUNTS;
    } catch {
      return DEFAULT_INITIAL_COUNTS;
    }
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(false); // Instant 0s mount!
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent && jobs.length === 0) setLoading(true);
    setIsRefreshing(true);
    setError(null);

    try {
      const [jobsData, countsData] = await Promise.all([
        fetchJobs(activeFilter),
        fetchJobCounts(),
      ]);
      setJobs(jobsData);
      setCounts(countsData);

      try {
        localStorage.setItem(CACHE_JOBS_KEY, JSON.stringify(jobsData));
        localStorage.setItem(CACHE_COUNTS_KEY, JSON.stringify(countsData));
      } catch (e) {
        // ignore localStorage errors
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      // Keep cached jobs, don't break UI!
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [activeFilter, jobs.length]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto refresh every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      loadData(true);
    }, 10000);
    return () => clearInterval(timer);
  }, [loadData]);

  const handleCreateJob = async (jobData) => {
    try {
      const newJob = await apiCreateJob(jobData);
      setToast({
        type: 'success',
        title: 'Job Created',
        message: `Job "${newJob.title}" created with status "pending".`,
      });
      await loadData(true);
      return newJob;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create job';
      setToast({ type: 'error', title: 'Create Failed', message: msg });
      throw err;
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updated = await apiUpdateStatus(id, newStatus);
      setToast({
        type: 'success',
        title: 'Status Updated',
        message: `Job status changed to "${updated.status}".`,
      });
      await loadData(true);
      return updated;
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to update job status';

      if (status === 409) {
        setToast({ type: 'conflict', title: 'Concurrency Conflict (409)', message });
      } else if (status === 400) {
        setToast({ type: 'error', title: 'Invalid State Transition (400)', message });
      } else {
        setToast({ type: 'error', title: 'Update Error', message });
      }
      await loadData(true);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await apiDeleteJob(id);
      setToast({ type: 'success', title: 'Job Deleted', message: 'Job removed successfully.' });
      await loadData(true);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete job';
      setToast({ type: 'error', title: 'Delete Failed', message });
    }
  };

  return {
    jobs,
    counts,
    activeFilter,
    setActiveFilter,
    loading,
    isRefreshing,
    error,
    toast,
    setToast,
    refresh: loadData,
    createJob: handleCreateJob,
    updateJobStatus: handleUpdateStatus,
    deleteJob: handleDeleteJob,
  };
}
