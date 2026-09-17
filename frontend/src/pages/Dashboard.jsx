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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Navbar
        onOpenCreateModal={() => setIsModalOpen(true)}
        onRefresh={() => refresh()}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-10 space-y-10">
        {/* Top Metric Cards */}
        <StatusSummary
          counts={counts}
          activeFilter={activeStatus}
          onSelectFilter={setActiveStatus}
        />

        {/* Search & Select Filters */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2.5">
              <span>Task Execution Queue</span>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
              </span>
            </h2>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 flex items-center space-x-1.5 hover:underline transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
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
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 font-mono">
        Mini Job Queue Dashboard • Built with NestJS, TypeORM & React
      </footer>

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                Create New Job
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/60 transition"
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
