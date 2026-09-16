import React from 'react';
import { PlayCircle, Cpu } from 'lucide-react';

export default function ActiveQueue({ jobs }) {
  const runningJobs = jobs.filter((j) => j.status === 'running');

  if (runningJobs.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Cpu className="w-3.5 h-3.5 text-blue-400" />
        Active Queue ({runningJobs.length})
      </h2>

      <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-800/80 overflow-hidden">
        {runningJobs.map((job, idx) => {
          // Simulated progress for active execution demo
          const progressValues = [42, 68, 85, 30, 92];
          const progress = progressValues[idx % progressValues.length];

          return (
            <div key={job.id} className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center gap-1 text-blue-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  <PlayCircle className="w-3.5 h-3.5" />
                  Running
                </span>
                <span className="font-medium text-slate-200">{job.title}</span>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                  {job.type}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="font-mono text-slate-400 text-xs">{progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
