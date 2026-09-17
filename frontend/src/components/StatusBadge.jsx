import React from 'react';

export default function StatusBadge({ status }) {
  const configs = {
    pending: {
      label: 'Pending',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200/80 shadow-sm',
      dotStyle: 'bg-amber-500',
    },
    running: {
      label: 'Running',
      badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200/80 shadow-sm',
      dotStyle: 'bg-blue-500',
    },
    completed: {
      label: 'Completed',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-sm',
      dotStyle: 'bg-emerald-500',
    },
    failed: {
      label: 'Failed',
      badgeStyle: 'bg-rose-50 text-rose-800 border-rose-200/80 shadow-sm',
      dotStyle: 'bg-rose-500',
    },
  };

  const config = configs[status] || {
    label: status,
    badgeStyle: 'bg-slate-100 text-slate-700 border-slate-200',
    dotStyle: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badgeStyle}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotStyle}`}></span>
      </span>
      <span>{config.label}</span>
    </span>
  );
}
