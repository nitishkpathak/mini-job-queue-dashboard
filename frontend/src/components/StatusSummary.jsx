import React from 'react';
import { Layers, Clock, Play, CheckCircle2, XCircle } from 'lucide-react';

export default function StatusSummary({ counts, activeFilter, onSelectFilter }) {
  const cards = [
    {
      id: 'all',
      label: 'Total Jobs',
      subtext: 'All system tasks',
      count: counts?.total || 0,
      icon: Layers,
      color: 'text-slate-900',
      activeBorder: 'border-indigo-600 ring-2 ring-indigo-500/15 bg-indigo-50/20',
      accentTop: 'border-t-4 border-t-indigo-600',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'pending',
      label: 'Pending',
      subtext: 'Awaiting execution',
      count: counts?.pending || 0,
      icon: Clock,
      color: 'text-amber-600',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/15 bg-amber-50/30',
      accentTop: 'border-t-4 border-t-amber-500',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'running',
      label: 'Running',
      subtext: 'Active in worker',
      count: counts?.running || 0,
      icon: Play,
      color: 'text-blue-600',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/15 bg-blue-50/30',
      accentTop: 'border-t-4 border-t-blue-500',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'completed',
      label: 'Completed',
      subtext: 'Finished successfully',
      count: counts?.completed || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/15 bg-emerald-50/30',
      accentTop: 'border-t-4 border-t-emerald-500',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'failed',
      label: 'Failed',
      subtext: 'Requires attention',
      count: counts?.failed || 0,
      icon: XCircle,
      color: 'text-rose-600',
      activeBorder: 'border-rose-500 ring-2 ring-rose-500/15 bg-rose-50/30',
      accentTop: 'border-t-4 border-t-rose-500',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 w-full">
      {cards.map((card) => {
        const isActive = activeFilter === card.id;
        const Icon = card.icon;

        return (
          <button
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`p-5 md:p-6 rounded-2xl border bg-white text-left transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer overflow-hidden ${
              isActive
                ? `${card.activeBorder} ${card.accentTop} shadow-md`
                : `${card.accentTop} border-slate-200 hover:border-slate-300`
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className="text-xs font-medium text-slate-400 block mt-1">
                  {card.subtext}
                </span>
              </div>
              <div className={`p-2.5 rounded-xl border shrink-0 ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${card.color}`}>
              {card.count}
            </div>
          </button>
        );
      })}
    </div>
  );
}
