import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              AI Summarizer Engine Settings
            </h3>
            <p className="text-xs text-slate-400">
              Zero-config built-in NLP AI is active by default
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex items-start space-x-2">
            <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <p>
              <strong>Default Mode:</strong> Uses client-side extractive & abstractive TF-IDF summarizer (No API key required, 100% free and instant).
            </p>
          </div>
          <div className="flex items-start space-x-2 pt-1 border-t border-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Optionally enter your Google Gemini or OpenAI API Key if you want external LLM capabilities. Keys are saved strictly in local memory.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Custom AI API Key (Optional)
            </label>
            <input
              type="password"
              placeholder="AIzaSy... or sk-..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
