import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center space-x-3 text-rose-300 text-sm">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
      <div className="flex-1">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-xs font-medium transition"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
