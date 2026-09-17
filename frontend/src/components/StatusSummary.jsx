import React from 'react';
import { Layers, Clock, Play, CheckCircle2, XCircle } from 'lucide-react';

export default function StatusSummary({ counts, activeFilter, onSelectFilter }) {
  const cards = [
    {
      id: 'all',
      label: 'Total Jobs',
      count: counts?.total || 0,
      icon: Layers,
      color: 'text-slate-900',
      bgColor: 'bg-white hover:bg-slate-50',
      activeBorder: 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/30',
      accent: 'border-slate-200',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      id: 'pending',
      label: 'Pending',
      count: counts?.pending || 0,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-white hover:bg-amber-50/40',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/40',
      accent: 'border-slate-200',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'running',
      label: 'Running',
      count: counts?.running || 0,
      icon: Play,
      color: 'text-blue-600',
      bgColor: 'bg-white hover:bg-blue-50/40',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/40',
      accent: 'border-slate-200',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: counts?.completed || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-white hover:bg-emerald-50/40',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40',
      accent: 'border-slate-200',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'failed',
      label: 'Failed',
      count: counts?.failed || 0,
      icon: XCircle,
      color: 'text-rose-600',
      bgColor: 'bg-white hover:bg-rose-50/40',
      activeBorder: 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/40',
      accent: 'border-slate-200',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 w-full">
      {cards.map((card) => {
        const isActive = activeFilter === card.id;
        const Icon = card.icon;

        return (
          <button
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between shadow-sm cursor-pointer ${
              isActive
                ? `${card.activeBorder} shadow-md`
                : `${card.bgColor} ${card.accent} hover:border-slate-300`
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-600 tracking-wide">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl border ${card.badgeBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-3xl font-extrabold font-mono ${card.color}`}>
              {card.count}
            </div>
          </button>
        );
      })}
    </div>
  );
}
