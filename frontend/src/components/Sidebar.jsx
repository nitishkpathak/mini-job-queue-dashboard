import React from 'react';
import { LayoutDashboard, ListTodo, Server, Database } from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, isOnline }) {
  return (
    <aside className="w-56 border-r border-slate-800 bg-slate-900/60 shrink-0 hidden md:flex flex-col justify-between py-5 px-3 min-h-[calc(100vh-4rem)] text-xs">
      <div className="space-y-6">
        {/* Navigation */}
        <div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Navigation
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-md font-medium transition ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onTabChange('jobs')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-md font-medium transition ${
                activeTab === 'jobs'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <ListTodo className="w-4 h-4 text-slate-400" />
              <span>All Jobs</span>
            </button>
          </nav>
        </div>

        {/* System Info */}
        <div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Environment
          </div>
          <div className="space-y-2 px-3 py-1">
            <div className="flex items-center justify-between text-slate-300">
              <div className="flex items-center space-x-2">
                <Server className="w-3.5 h-3.5 text-slate-500" />
                <span>Backend API</span>
              </div>
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                  isOnline
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                    : 'bg-rose-950/60 text-rose-400 border-rose-800/60'
                }`}
              >
                {isOnline ? 'Connected' : 'Offline'}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <div className="flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-slate-500" />
                <span>Database</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                SQLite
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
        Internal Dev Tool v1.0
      </div>
    </aside>
  );
}
