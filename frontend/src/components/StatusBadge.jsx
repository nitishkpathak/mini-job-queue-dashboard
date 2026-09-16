import React from 'react';
import { Clock, Play, CheckCircle2, XCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const configs = {
    pending: {
      label: 'Pending',
      style: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
      icon: Clock,
    },
    running: {
      label: 'Running',
      style: 'bg-blue-950/60 text-blue-300 border-blue-800/60 animate-pulse',
      icon: Play,
    },
    completed: {
      label: 'Completed',
      style: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
      icon: CheckCircle2,
    },
    failed: {
      label: 'Failed',
      style: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
      icon: XCircle,
    },
  };

  const config = configs[status] || {
    label: status,
    style: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Clock,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.style}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
