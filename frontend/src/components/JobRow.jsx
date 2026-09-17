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
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/40 transition duration-150 text-xs group">
      {/* 1. ID */}
      <td className="py-3.5 px-4 font-mono text-slate-400 font-medium whitespace-nowrap">
        <div className="flex items-center space-x-1.5">
          <span className="bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300 font-mono" title={job.id}>
            {shortId}
          </span>
          <button
            onClick={handleCopyId}
            className="text-slate-500 hover:text-slate-200 transition opacity-60 group-hover:opacity-100 p-1 rounded hover:bg-slate-800"
            title="Copy full UUID"
          >
            {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </td>

      {/* 2. TITLE */}
      <td className="py-3.5 px-4 font-medium text-slate-100">
        <div className="font-semibold text-slate-100 text-xs sm:text-sm">{job.title}</div>
        {/* Mobile Subtext */}
        <div className="text-[11px] text-slate-400 font-mono sm:hidden mt-0.5 flex items-center space-x-1">
          <span>{job.type}</span>
          <span>•</span>
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </td>

      {/* 3. TYPE */}
      <td className="py-3.5 px-4 font-mono text-slate-300 hidden sm:table-cell">
        <span className="bg-slate-800/90 border border-slate-700/60 px-2.5 py-1 rounded-md text-slate-300 text-[11px] font-medium tracking-wide">
          {job.type}
        </span>
      </td>

      {/* 4. STATUS */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <StatusBadge status={job.status} />
      </td>

      {/* 5. CREATED */}
      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap hidden md:table-cell font-mono text-[11px]">
        {formatDate(job.createdAt)}
      </td>

      {/* 6. ACTIONS */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end space-x-2">
          {updating ? (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-800 rounded-lg text-blue-400 text-xs font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Updating...</span>
            </div>
          ) : (
            <>
              {job.status === 'pending' && (
                <button
                  onClick={() => handleStatus('running')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-300 bg-blue-950/70 hover:bg-blue-900 border border-blue-700/60 px-3 py-1.5 rounded-lg shadow-sm shadow-blue-950/40 hover:shadow-blue-900/50 transition active:scale-95"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run Job</span>
                </button>
              )}

              {job.status === 'running' && (
                <>
                  <button
                    onClick={() => handleStatus('completed')}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 px-2.5 py-1.5 rounded-lg shadow-sm shadow-emerald-950/40 transition active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>

                  <button
                    onClick={() => handleStatus('failed')}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-rose-300 bg-rose-950/70 hover:bg-rose-900 border border-rose-700/60 px-2.5 py-1.5 rounded-lg shadow-sm shadow-rose-950/40 transition active:scale-95"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Fail</span>
                  </button>
                </>
              )}

              {(job.status === 'completed' || job.status === 'failed') && (
                <span className="text-[11px] text-slate-500 italic px-2">Terminal State</span>
              )}
            </>
          )}

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg border border-transparent hover:border-rose-900/40 transition disabled:opacity-50"
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
