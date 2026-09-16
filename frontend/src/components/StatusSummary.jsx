import React from 'react';

export default function StatusSummary({ counts, activeFilter, onSelectFilter }) {
  const items = [
    { id: 'all', label: 'All Jobs', count: counts?.total || 0, color: 'text-slate-100', activeClass: 'border-slate-500 bg-slate-800' },
    { id: 'pending', label: 'Pending', count: counts?.pending || 0, color: 'text-amber-400', activeClass: 'border-amber-500/50 bg-amber-950/40' },
    { id: 'running', label: 'Running', count: counts?.running || 0, color: 'text-blue-400', activeClass: 'border-blue-500/50 bg-blue-950/40' },
    { id: 'completed', label: 'Completed', count: counts?.completed || 0, color: 'text-emerald-400', activeClass: 'border-emerald-500/50 bg-emerald-950/40' },
    { id: 'failed', label: 'Failed', count: counts?.failed || 0, color: 'text-rose-400', activeClass: 'border-rose-500/50 bg-rose-950/40' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const isActive = activeFilter === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectFilter(item.id)}
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              isActive
                ? `${item.activeClass} text-slate-100 ring-1 ring-slate-700 shadow-sm`
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span>{item.label}</span>
            <span className={`font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-slate-950/60 ${item.color}`}>
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
