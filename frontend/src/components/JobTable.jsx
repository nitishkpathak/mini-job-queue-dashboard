import React from 'react';
import JobRow from './JobRow';
import { Layers } from 'lucide-react';

export default function JobTable({ jobs, onStatusChange, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-slate-300 rounded-2xl bg-white p-8 flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-sm">
        <div className="p-3 bg-slate-100 rounded-xl text-slate-500 mb-3 border border-slate-200 shadow-sm">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">No Jobs Found</h3>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          No job records match the selected search or filter criteria. Create a new job to populate the queue.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm mb-8">
      <table className="w-full text-left border-collapse min-w-[650px] sm:min-w-full">
        <thead>
          <tr className="border-b border-slate-200 text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider bg-slate-100/90">
            <th className="py-4.5 px-6 w-40">Job ID</th>
            <th className="py-4.5 px-6">Title</th>
            <th className="py-4.5 px-6 hidden sm:table-cell">Job Type</th>
            <th className="py-4.5 px-6">Status</th>
            <th className="py-4.5 px-6 hidden md:table-cell">Created At</th>
            <th className="py-4.5 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
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
