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
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 mb-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter jobs by title or type..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 pl-9 pr-8 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Select Filter Group */}
      <div className="flex items-center gap-2">
        {/* Status Filter */}
        <div className="flex-1 sm:flex-none">
          <select
            value={activeStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-700 transition cursor-pointer"
          >
            <option value="all">All Statuses</option>
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
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-700 transition cursor-pointer"
          >
            <option value="all">All Types</option>
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
