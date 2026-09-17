import React from 'react';
import { RefreshCw, Plus, Layers } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, onRefresh, isRefreshing }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-bold tracking-widest text-indigo-700 uppercase bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                AIRTH
              </span>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Mini Job Queue Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-200 px-4 py-2.5 rounded-xl border border-slate-300 transition disabled:opacity-50 shadow-sm cursor-pointer"
            title="Refresh job queue"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-600' : 'text-slate-500'}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>New Job</span>
          </button>
        </div>
      </div>
    </header>
  );
}
