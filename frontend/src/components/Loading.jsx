import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({ message = 'Loading job queue dashboard...' }) {
  return (
    <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400 space-y-3">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
