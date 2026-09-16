import React, { useState } from 'react';
import { Play, Check, X, Trash2, Loader2, Copy, Check as CheckIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/jobUtils';

export default function JobRow({ job, onStatusChange, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await onStatusChange(job.id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete job "${job.title}"?`)) {
      setDeleting(true);
      try {
        await onDelete(job.id);
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(job.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortId = job.id ? `${job.id.substring(0, 8)}...` : '-';

  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-900/50 transition text-xs group">
      {/* 1. ID */}
      <td className="py-3 px-4 font-mono text-slate-400 font-medium whitespace-nowrap">
        <div className="flex items-center space-x-1">
          <span title={job.id}>{shortId}</span>
          <button
            onClick={handleCopyId}
            className="text-slate-600 hover:text-slate-300 transition opacity-0 group-hover:opacity-100 p-0.5"
            title="Copy full UUID"
          >
            {copied ? <CheckIcon className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </td>

      {/* 2. TITLE */}
      <td className="py-3 px-4 font-medium text-slate-100">
        <div>{job.title}</div>
        {/* Mobile Subtext */}
        <div className="text-[11px] text-slate-500 font-mono sm:hidden mt-0.5">
          {job.type} • {formatDate(job.createdAt)}
        </div>
      </td>

      {/* 3. TYPE */}
      <td className="py-3 px-4 font-mono text-slate-400 hidden sm:table-cell">
        <span className="bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 rounded text-slate-300 text-[11px]">
          {job.type}
        </span>
      </td>

      {/* 4. STATUS */}
      <td className="py-3 px-4 whitespace-nowrap">
        <StatusBadge status={job.status} />
      </td>

      {/* 5. CREATED */}
      <td className="py-3 px-4 text-slate-400 whitespace-nowrap hidden md:table-cell">
        {formatDate(job.createdAt)}
      </td>

      {/* 6. ACTIONS */}
      <td className="py-3 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end space-x-1.5">
          {updating ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-400 my-0.5" />
          ) : (
            <>
              {job.status === 'pending' && (
                <button
                  onClick={() => handleStatus('running')}
                  className="inline-flex items-center space-x-1 text-xs font-medium text-blue-300 bg-blue-950/80 hover:bg-blue-900/80 border border-blue-700/60 px-2.5 py-1 rounded-md transition"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run</span>
                </button>
              )}

              {job.status === 'running' && (
                <>
                  <button
                    onClick={() => handleStatus('completed')}
                    className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/60 px-2.5 py-1 rounded-md transition"
                  >
                    <Check className="w-3 h-3" />
                    <span>Complete</span>
                  </button>

                  <button
                    onClick={() => handleStatus('failed')}
                    className="inline-flex items-center space-x-1 text-xs font-medium text-rose-300 bg-rose-950/80 hover:bg-rose-900/80 border border-rose-700/60 px-2.5 py-1 rounded-md transition"
                  >
                    <X className="w-3 h-3" />
                    <span>Fail</span>
                  </button>
                </>
              )}

              {(job.status === 'completed' || job.status === 'failed') && (
                <span className="text-[11px] text-slate-500 italic">No actions</span>
              )}
            </>
          )}

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-md transition disabled:opacity-50"
            title="Delete job"
          >
            {deleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
