import { useState, useEffect, useCallback } from 'react';
import {
  fetchJobs,
  fetchJobCounts,
  createJob as apiCreateJob,
  updateJobStatus as apiUpdateStatus,
  deleteJob as apiDeleteJob,
} from '../services/jobApi';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [counts, setCounts] = useState({ total: 0, pending: 0, running: 0, completed: 0, failed: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setIsRefreshing(true);
    setError(null);

    try {
      const [jobsData, countsData] = await Promise.all([
        fetchJobs(activeFilter),
        fetchJobCounts(),
      ]);
      setJobs(jobsData);
      setCounts(countsData);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(
        err.response?.data?.message ||
          'Failed to connect to backend API server. Make sure NestJS is running on port 3001.',
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [activeFilter]);

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
