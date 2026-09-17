import React from 'react';
import { RefreshCw, Plus, Layers } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, onRefresh, isRefreshing }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                AIRTH
              </span>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Mini Job Queue Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 self-end sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition disabled:opacity-50 shadow-sm"
            title="Refresh job queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-600' : 'text-slate-500'}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Job</span>
          </button>
        </div>
      </div>
    </header>
  );
}
