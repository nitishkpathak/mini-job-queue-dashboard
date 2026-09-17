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
    <tr className="border-b border-slate-100 hover:bg-slate-50/90 transition-all duration-150 text-sm group">
      {/* 1. ID */}
      <td className="py-5 px-6 font-mono text-slate-600 font-semibold whitespace-nowrap">
        <div className="flex items-center space-x-2.5">
          <span className="bg-slate-100/90 border border-slate-200/90 px-3 py-1 rounded-lg text-xs sm:text-sm text-slate-800 font-mono font-bold shadow-2xs group-hover:border-indigo-300 transition" title={job.id}>
            {shortId}
          </span>
          <button
            onClick={handleCopyId}
            className="text-slate-400 hover:text-indigo-600 transition p-1.5 rounded-lg hover:bg-indigo-50"
            title="Copy full UUID"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </td>

      {/* 2. TITLE */}
      <td className="py-5 px-6 font-bold text-slate-900">
        <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{job.title}</div>
        {/* Mobile Subtext */}
        <div className="text-xs text-slate-500 font-mono sm:hidden mt-1.5 flex items-center space-x-2">
          <span>{job.type}</span>
          <span>•</span>
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </td>

      {/* 3. TYPE */}
      <td className="py-5 px-6 font-mono text-slate-700 hidden sm:table-cell">
        <span className="bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide text-slate-700">
          {job.type}
        </span>
      </td>

      {/* 4. STATUS */}
      <td className="py-5 px-6 whitespace-nowrap">
        <StatusBadge status={job.status} />
      </td>

      {/* 5. CREATED */}
      <td className="py-5 px-6 text-slate-500 whitespace-nowrap hidden md:table-cell font-mono text-xs sm:text-sm">
        {formatDate(job.createdAt)}
      </td>

      {/* 6. ACTIONS */}
      <td className="py-5 px-6 text-right whitespace-nowrap">
        <div className="flex items-center justify-end space-x-2.5">
          {updating ? (
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-xl text-indigo-600 text-xs sm:text-sm font-semibold border border-slate-200">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating...</span>
            </div>
          ) : (
            <>
              {job.status === 'pending' && (
                <button
                  onClick={() => handleStatus('running')}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Job</span>
                </button>
              )}

              {job.status === 'running' && (
                <>
                  <button
                    onClick={() => handleStatus('completed')}
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Complete</span>
                  </button>

                  <button
                    onClick={() => handleStatus('failed')}
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Fail</span>
                  </button>
                </>
              )}

              {(job.status === 'completed' || job.status === 'failed') && (
                <span className="text-xs text-slate-400 font-semibold italic px-2">Terminal State</span>
              )}
            </>
          )}

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition active:scale-95 cursor-pointer"
            title="Delete job"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
