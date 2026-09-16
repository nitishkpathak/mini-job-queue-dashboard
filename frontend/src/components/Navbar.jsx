import React from 'react';
import { RefreshCw, Plus, Cpu } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, onRefresh, isRefreshing }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
              Job Queue Dashboard
            </h1>
            <p className="text-xs text-slate-400">Manage and monitor background task queues</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 active:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition disabled:opacity-50"
            title="Refresh job queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-slate-400' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Job</span>
          </button>
        </div>
      </div>
    </header>
  );
}
