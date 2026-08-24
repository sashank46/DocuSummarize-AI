import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl glass-card border border-slate-700/80 shadow-2xl bg-slate-900/95 animate-in slide-in-from-bottom-5 duration-200">
      <div className="shrink-0 mt-0.5">
        {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
        {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-400" />}
        {toast.type === 'info' && <Info className="h-5 w-5 text-indigo-400" />}
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-bold text-white font-['Outfit']">{toast.title}</h4>
        {toast.message && <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
