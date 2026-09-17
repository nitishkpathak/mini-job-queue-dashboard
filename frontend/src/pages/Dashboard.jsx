import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import StatusSummary from '../components/StatusSummary';
import StatusFilter from '../components/StatusFilter';
import JobTable from '../components/JobTable';
import JobForm from '../components/JobForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NotificationToast from '../components/NotificationToast';
import { useJobs } from '../hooks/useJobs';
import { X, Plus, Filter, RotateCcw } from 'lucide-react';

export default function Dashboard() {
  const {
    jobs,
    counts,
    loading,
    isRefreshing,
    error,
    toast,
    setToast,
    refresh,
    createJob,
    updateJobStatus,
    deleteJob,
  } = useJobs();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic unique job types list
  const availableTypes = useMemo(() => {
    const set = new Set(jobs.map((j) => j.type));
    return Array.from(set);
  }, [jobs]);

  // Filter jobs based on search, status, type
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = activeStatus === 'all' || job.status === activeStatus;
      const matchesType = activeType === 'all' || job.type === activeType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [jobs, searchQuery, activeStatus, activeType]);

  const hasActiveFilters = searchQuery || activeStatus !== 'all' || activeType !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setActiveStatus('all');
    setActiveType('all');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Navbar
        onOpenCreateModal={() => setIsModalOpen(true)}
        onRefresh={() => refresh()}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Metric Cards */}
        <StatusSummary
          counts={counts}
          activeFilter={activeStatus}
          onSelectFilter={setActiveStatus}
        />

        {/* Search & Select Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>Task Execution Queue</span>
              <span className="text-[11px] font-mono font-normal text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 rounded-md">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
              </span>
            </h2>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center space-x-1 hover:underline transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          <StatusFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            activeType={activeType}
            onTypeChange={setActiveType}
            availableTypes={availableTypes}
          />
        </div>

        {/* Error Banner */}
        {error && <ErrorMessage message={error} onRetry={refresh} />}

        {/* Main Jobs Table */}
        {loading ? (
          <Loading />
        ) : (
          <JobTable
            jobs={filteredJobs}
            onStatusChange={updateJobStatus}
            onDelete={deleteJob}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 text-center text-xs text-slate-500 font-mono">
        Mini Job Queue Dashboard • Built with NestJS, TypeORM & React
      </footer>

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-slate-950">
            <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                Create New Job
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <JobForm
                onSubmit={async (data) => {
                  await createJob(data);
                  setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
