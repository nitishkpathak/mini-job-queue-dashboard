import React from 'react';
import { RefreshCw, Plus, Layers, Activity } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, onRefresh, isRefreshing }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/80 border border-indigo-800/50 px-1.5 py-0.5 rounded">
                AIRTH
              </span>
              <h1 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
                Mini Job Queue Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="flex items-center text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block mr-1.5"></span>
                Backend Live
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-slate-400 font-mono">SQLite + NestJS</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 self-end sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-700/80 transition disabled:opacity-50 shadow-sm"
            title="Refresh job queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : 'text-slate-400'}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md shadow-blue-950/50 transition active:scale-95 border border-blue-500/30"
          >
            <Plus className="w-4 h-4" />
            <span>New Job</span>
          </button>
        </div>
      </div>
    </header>
  );
}
