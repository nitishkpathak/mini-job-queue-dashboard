import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isConflict = toast.type === 'conflict';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-2xl border shadow-2xl flex items-start space-x-3 bg-white ${
          isSuccess
            ? 'border-emerald-200 text-slate-900 shadow-emerald-500/10'
            : isConflict
            ? 'border-amber-200 text-slate-900 shadow-amber-500/10'
            : 'border-rose-200 text-slate-900 shadow-rose-500/10'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : isConflict ? (
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        )}

        <div className="flex-1 text-xs">
          <h4 className="font-bold text-slate-900 text-sm mb-0.5">{toast.title}</h4>
          <p className="text-slate-600">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
