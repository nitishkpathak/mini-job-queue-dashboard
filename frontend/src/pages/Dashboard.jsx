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
import { X, Plus, Sparkles } from 'lucide-react';

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

  const handleSeedJobs = async () => {
    const sampleJobs = [
      { title: 'Process Monthly Invoices', type: 'DOCUMENT_PROCESSING' },
      { title: 'Send Welcome Email Campaign', type: 'EMAIL_NOTIFICATION' },
      { title: 'Export User Analytics CSV', type: 'DATA_EXPORT' },
      { title: 'Compress Product Images', type: 'IMAGE_OPTIMIZATION' },
    ];

    try {
      for (const j of sampleJobs) {
        await createJob(j);
      }
    } catch (err) {
      // Handled in useJobs hook
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Navbar
        onOpenCreateModal={() => setIsModalOpen(true)}
        onRefresh={() => refresh()}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Top Controls & Status Summary */}
        <div className="mb-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Job Queue
                <span className="text-xs font-mono font-normal text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
                </span>
              </h2>
            </div>

            {/* Interactive Status Summary Pills */}
            <StatusSummary
              counts={counts}
              activeFilter={activeStatus}
              onSelectFilter={setActiveStatus}
            />
          </div>

          {/* Search & Select Filters */}
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
          <>
            {jobs.length === 0 && (
              <div className="mb-4 text-center">
                <button
                  onClick={handleSeedJobs}
                  className="inline-flex items-center space-x-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-800/40 px-3.5 py-2 rounded-lg transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Seed Demo Jobs</span>
                </button>
              </div>
            )}

            <JobTable
              jobs={filteredJobs}
              onStatusChange={updateJobStatus}
              onDelete={deleteJob}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        Job Queue Management Dashboard • Built with NestJS & React
      </footer>

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                Create New Job
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
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
