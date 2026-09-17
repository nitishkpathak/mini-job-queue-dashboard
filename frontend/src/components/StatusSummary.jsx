import React from 'react';
import { Layers, Clock, Play, CheckCircle2, XCircle } from 'lucide-react';

export default function StatusSummary({ counts, activeFilter, onSelectFilter }) {
  const cards = [
    {
      id: 'all',
      label: 'Total Jobs',
      count: counts?.total || 0,
      icon: Layers,
      color: 'text-slate-200',
      bgColor: 'bg-slate-900/80 hover:bg-slate-800/80',
      activeBorder: 'border-indigo-500/80 ring-1 ring-indigo-500/50 bg-slate-800/90',
      accent: 'border-slate-800',
      badgeBg: 'bg-slate-800 text-slate-300',
    },
    {
      id: 'pending',
      label: 'Pending',
      count: counts?.pending || 0,
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-slate-900/80 hover:bg-amber-950/30',
      activeBorder: 'border-amber-500/80 ring-1 ring-amber-500/50 bg-amber-950/40',
      accent: 'border-amber-900/40',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    },
    {
      id: 'running',
      label: 'Running',
      count: counts?.running || 0,
      icon: Play,
      color: 'text-blue-400',
      bgColor: 'bg-slate-900/80 hover:bg-blue-950/30',
      activeBorder: 'border-blue-500/80 ring-1 ring-blue-500/50 bg-blue-950/40',
      accent: 'border-blue-900/40',
      badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: counts?.completed || 0,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-slate-900/80 hover:bg-emerald-950/30',
      activeBorder: 'border-emerald-500/80 ring-1 ring-emerald-500/50 bg-emerald-950/40',
      accent: 'border-emerald-900/40',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    },
    {
      id: 'failed',
      label: 'Failed',
      count: counts?.failed || 0,
      icon: XCircle,
      color: 'text-rose-400',
      bgColor: 'bg-slate-900/80 hover:bg-rose-950/30',
      activeBorder: 'border-rose-500/80 ring-1 ring-rose-500/50 bg-rose-950/40',
      accent: 'border-rose-900/40',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
      {cards.map((card) => {
        const isActive = activeFilter === card.id;
        const Icon = card.icon;

        return (
          <button
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between shadow-sm cursor-pointer ${
              isActive
                ? `${card.activeBorder} shadow-lg`
                : `${card.bgColor} ${card.accent} border-slate-800/90 hover:border-slate-700`
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 tracking-wide">
                {card.label}
              </span>
              <div className={`p-1.5 rounded-lg border text-xs ${card.badgeBg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className={`text-2xl font-bold font-mono ${card.color}`}>
              {card.count}
            </div>
          </button>
        );
      })}
    </div>
  );
}
