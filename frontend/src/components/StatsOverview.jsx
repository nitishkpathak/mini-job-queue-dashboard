import React from 'react';
import { Clock, PlayCircle, CheckCircle2, XCircle, Layers } from 'lucide-react';

export default function StatsOverview({ counts, activeFilter, onSelectFilter }) {
  const stats = [
    {
      id: 'all',
      label: 'Total Jobs',
      count: counts?.total || 0,
      icon: Layers,
      color: 'indigo',
      border: 'border-slate-800 hover:border-indigo-500/50',
      activeBorder: 'border-indigo-500 ring-1 ring-indigo-500',
    },
    {
      id: 'pending',
      label: 'Pending',
      count: counts?.pending || 0,
      icon: Clock,
      color: 'amber',
      border: 'border-slate-800 hover:border-amber-500/50',
      activeBorder: 'border-amber-500 ring-1 ring-amber-500',
    },
    {
      id: 'running',
      label: 'Running',
      count: counts?.running || 0,
      icon: PlayCircle,
      color: 'blue',
      border: 'border-slate-800 hover:border-blue-500/50',
      activeBorder: 'border-blue-500 ring-1 ring-blue-500',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: counts?.completed || 0,
      icon: CheckCircle2,
      color: 'emerald',
      border: 'border-slate-800 hover:border-emerald-500/50',
      activeBorder: 'border-emerald-500 ring-1 ring-emerald-500',
    },
    {
      id: 'failed',
      label: 'Failed',
      count: counts?.failed || 0,
      icon: XCircle,
      color: 'rose',
      border: 'border-slate-800 hover:border-rose-500/50',
      activeBorder: 'border-rose-500 ring-1 ring-rose-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((item) => {
        const Icon = item.icon;
        const isActive = activeFilter === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectFilter(item.id)}
            className={`p-4 rounded-xl bg-slate-900 border text-left transition duration-200 cursor-pointer ${
              isActive ? item.activeBorder : item.border
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">{item.label}</span>
              <Icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{item.count}</div>
          </button>
        );
      })}
    </div>
  );
}
