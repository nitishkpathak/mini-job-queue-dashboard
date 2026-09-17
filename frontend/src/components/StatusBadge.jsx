import React from 'react';

export default function StatusBadge({ status }) {
  const configs = {
    pending: {
      label: 'Pending',
      badgeStyle: 'bg-amber-950/40 text-amber-300 border-amber-800/50 shadow-sm shadow-amber-950/20',
      dotStyle: 'bg-amber-400',
    },
    running: {
      label: 'Running',
      badgeStyle: 'bg-blue-950/50 text-blue-300 border-blue-700/60 shadow-sm shadow-blue-950/30',
      dotStyle: 'bg-blue-400',
    },
    completed: {
      label: 'Completed',
      badgeStyle: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50 shadow-sm shadow-emerald-950/20',
      dotStyle: 'bg-emerald-400',
    },
    failed: {
      label: 'Failed',
      badgeStyle: 'bg-rose-950/40 text-rose-300 border-rose-800/50 shadow-sm shadow-rose-950/20',
      dotStyle: 'bg-rose-400',
    },
  };

  const config = configs[status] || {
    label: status,
    badgeStyle: 'bg-slate-800 text-slate-300 border-slate-700',
    dotStyle: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badgeStyle}`}
    >
      <span className="relative flex h-2 w-2">
        {config.pulseDot && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotStyle}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotStyle}`}></span>
      </span>
      <span>{config.label}</span>
    </span>
  );
}
