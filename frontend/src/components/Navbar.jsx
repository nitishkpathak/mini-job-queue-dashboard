import React from 'react';
import { RefreshCw, Plus, Layers, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, onRefresh, isRefreshing }) {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title & Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                AIRTH
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                Mini Job Queue
              </h1>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Background Task Queue & Lifecycle Management Dashboard
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3.5 self-end sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-200/80 px-4.5 py-2.5 rounded-xl border border-slate-300 transition shadow-xs disabled:opacity-50 cursor-pointer"
            title="Refresh job queue"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-600' : 'text-slate-500'}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/25 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>New Job</span>
          </button>
        </div>
      </div>
    </header>
  );
}
