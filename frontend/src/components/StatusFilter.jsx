import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function StatusFilter({
  searchQuery,
  onSearchChange,
  activeStatus,
  onStatusChange,
  activeType,
  onTypeChange,
  availableTypes,
}) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-5">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search jobs by title or job type..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 pr-9 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 rounded-md hover:bg-slate-800 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Select Filter Group */}
      <div className="flex items-center gap-2.5">
        {/* Status Filter */}
        <div className="flex-1 sm:flex-none">
          <select
            value={activeStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-300 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition cursor-pointer shadow-sm"
          >
            <option value="all">Filter Status: All</option>
            <option value="pending">Pending</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex-1 sm:flex-none">
          <select
            value={activeType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-300 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition cursor-pointer shadow-sm"
          >
            <option value="all">Filter Type: All</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
