import React, { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

const PRESET_TYPES = [
  'DOCUMENT_PROCESSING',
  'EMAIL_NOTIFICATION',
  'DATA_EXPORT',
  'IMAGE_OPTIMIZATION',
  'REPORT_GENERATION',
];

export default function JobForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(PRESET_TYPES[0]);
  const [customType, setCustomType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const selectedType = type === 'CUSTOM' ? customType.trim() : type;

    if (!title.trim()) {
      setFormError('Job title is required');
      return;
    }

    if (!selectedType) {
      setFormError('Job type is required');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), type: selectedType });
      setTitle('');
      setCustomType('');
      setType(PRESET_TYPES[0]);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-xs font-medium">
          {formError}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Job Title <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Generate Monthly PDF Report"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Job Type <span className="text-rose-400">*</span>
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition mb-2"
        >
          {PRESET_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
          <option value="CUSTOM">+ Custom Type</option>
        </select>

        {type === 'CUSTOM' && (
          <input
            type="text"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            placeholder="Enter custom type"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        )}
      </div>

      <div className="pt-4 flex items-center justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl transition"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              Create Job
            </>
          )}
        </button>
      </div>
    </form>
  );
}
