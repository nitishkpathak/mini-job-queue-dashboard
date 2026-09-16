import React, { useState } from 'react';
import {
  Clock,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Tag,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const statusConfig = {
  pending: {
    label: 'Pending',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: Clock,
  },
  running: {
    label: 'Running',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse',
    icon: PlayCircle,
  },
  completed: {
    label: 'Completed',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: CheckCircle2,
  },
  failed: {
    label: 'Failed',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    icon: XCircle,
  },
};

export default function JobCard({ job, onStatusChange, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const statusInfo = statusConfig[job.status] || statusConfig.pending;
  const StatusIcon = statusInfo.icon;

  const handleStatusClick = async (newStatus) => {
    setUpdating(true);
    try {
      await onStatusChange(job.id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
      setDeleting(true);
      try {
        await onDelete(job.id);
      } finally {
        setDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition flex flex-col justify-between">
      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="font-semibold text-slate-100 text-base leading-snug line-clamp-2">
            {job.title}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${statusInfo.badgeClass}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {statusInfo.label}
          </span>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
              {job.type}
            </span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            ID: {job.id.substring(0, 8)}...
          </div>
          <div className="text-slate-500 text-[11px]">
            Created: {formatDate(job.createdAt)}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2">
        {/* State Transition Actions */}
        <div className="flex items-center gap-2">
          {updating ? (
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium px-2 py-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Updating status...
            </div>
          ) : (
            <>
              {job.status === 'pending' && (
                <button
                  onClick={() => handleStatusClick('running')}
                  className="inline-flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-medium text-xs px-3 py-1.5 rounded-lg transition"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  Start (Running)
                </button>
              )}

              {job.status === 'running' && (
                <>
                  <button
                    onClick={() => handleStatusClick('completed')}
                    className="inline-flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-medium text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Complete
                  </button>

                  <button
                    onClick={() => handleStatusClick('failed')}
                    className="inline-flex items-center gap-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-medium text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Fail
                  </button>
                </>
              )}

              {(job.status === 'completed' || job.status === 'failed') && (
                <span className="text-xs text-slate-500 italic flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Terminal State
                </span>
              )}
            </>
          )}
        </div>

        {/* Delete Action */}
        <button
          onClick={handleDeleteClick}
          disabled={deleting}
          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition disabled:opacity-50"
          title="Delete job"
        >
          {deleting ? (
            <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
