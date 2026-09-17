import React from 'react';
import { Search, X } from 'lucide-react';

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
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search jobs by title or job type..."
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 pl-11 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Select Filter Group */}
      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <div className="flex-1 sm:flex-none">
          <select
            value={activeStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition cursor-pointer shadow-sm"
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
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition cursor-pointer shadow-sm"
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
