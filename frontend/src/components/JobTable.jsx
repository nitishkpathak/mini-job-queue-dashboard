import React from 'react';
import JobRow from './JobRow';
import { Layers } from 'lucide-react';

export default function JobTable({ jobs, onStatusChange, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40 p-8 flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-inner">
        <div className="p-3 bg-slate-800/80 rounded-xl text-slate-400 mb-3 border border-slate-700/50 shadow-md">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200 mb-1">No Jobs Found</h3>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          No job records match the selected search or filter criteria. Create a new job to populate the queue.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl mb-8">
      <table className="w-full text-left border-collapse min-w-[650px] sm:min-w-full">
        <thead>
          <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80">
            <th className="py-3.5 px-4 w-32">Job ID</th>
            <th className="py-3.5 px-4">Title</th>
            <th className="py-3.5 px-4 hidden sm:table-cell">Job Type</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 hidden md:table-cell">Created At</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {jobs.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
