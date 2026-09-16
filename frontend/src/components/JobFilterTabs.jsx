import React from 'react';

const tabs = [
  { id: 'all', label: 'All Jobs' },
  { id: 'pending', label: 'Pending' },
  { id: 'running', label: 'Running' },
  { id: 'completed', label: 'Completed' },
  { id: 'failed', label: 'Failed' },
];

export default function JobFilterTabs({ activeFilter, onSelectFilter }) {
  return (
    <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-1 mb-6">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectFilter(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${
              isActive
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
