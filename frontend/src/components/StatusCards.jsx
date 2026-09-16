import React from 'react';

export default function StatusCards({ counts, activeFilter, onSelectFilter }) {
  const cards = [
    { id: 'all', label: 'Total Jobs', count: counts?.total || 0, color: 'text-slate-100' },
    { id: 'pending', label: 'Pending', count: counts?.pending || 0, color: 'text-amber-400' },
    { id: 'running', label: 'Running', count: counts?.running || 0, color: 'text-blue-400' },
    { id: 'completed', label: 'Completed', count: counts?.completed || 0, color: 'text-emerald-400' },
    { id: 'failed', label: 'Failed', count: counts?.failed || 0, color: 'text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
      {cards.map((card) => {
        const isActive = activeFilter === card.id;
        return (
          <button
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`p-3 rounded-lg border text-left transition cursor-pointer ${
              isActive
                ? 'bg-slate-800 border-slate-600 ring-1 ring-slate-600'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-medium text-slate-400 mb-1">{card.label}</div>
            <div className={`text-xl font-bold tracking-tight font-mono ${card.color}`}>
              {card.count}
            </div>
          </button>
        );
      })}
    </div>
  );
}
