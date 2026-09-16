import React from 'react';
import JobRow from './JobRow';
import { Layers } from 'lucide-react';

export default function JobTable({ jobs, onStatusChange, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/40 p-6 flex flex-col items-center justify-center max-w-md mx-auto my-4">
        <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-400 mb-2">
          <Layers className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-semibold text-slate-200 mb-1">No Jobs Found</h3>
        <p className="text-[11px] text-slate-400 max-w-xs">
          No job records match the selected search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-xl shadow-sm mb-6">
      <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
        <thead>
          <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/70">
            <th className="py-3 px-4 w-28">ID</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4 hidden sm:table-cell">Type</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 hidden md:table-cell">Created At</th>
            <th className="py-3 px-4 text-right">Actions</th>
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
