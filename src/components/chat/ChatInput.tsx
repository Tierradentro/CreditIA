import { useState, useRef, useCallback } from 'react';
import { Send, Loader2, ChevronRight, BarChart3, ShieldCheck } from 'lucide-react';
import { FIELD_LABELS } from '@/hooks/useChat';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  currentField: string | null;
  quickReplies: string[];
  showQuickReplies: boolean;
  isProcessing: boolean;
}

export default function ChatInput({
  onSend,
  disabled,
  currentField,
  quickReplies,
  showQuickReplies,
  isProcessing,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || disabled) return;
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    },
    [input, disabled, onSend]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handleInput = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, []);

  return (
    <div className="flex-shrink-0 border-t border-[#1a3a5c]/50 bg-[#0f1d32]/80 backdrop-blur-sm">
      {/* Contextual Quick Replies */}
      {showQuickReplies && quickReplies.length > 0 && currentField && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center gap-2 mb-2">
            <ChevronRight className="w-3 h-3 text-[#c9a33d]" />
            <span className="text-[10px] uppercase tracking-wider text-[#c9a33d] font-semibold">
              Sugerencias para: {FIELD_LABELS[currentField] || currentField}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => {
                  onSend(reply);
                }}
                disabled={disabled}
                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#1a3a5c]/30 border border-[#1a3a5c]/50 text-xs text-slate-400 hover:text-white hover:border-[#c9a33d]/30 hover:bg-[#c9a33d]/5 transition-all duration-300 disabled:opacity-50"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0068a3]/10 border border-[#0068a3]/20">
              <BarChart3 className="w-3.5 h-3.5 text-[#0068a3] animate-pulse" />
              <span className="text-xs text-[#0068a3] font-medium">Analista procesando...</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Scoring en progreso...</span>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder={
                isProcessing
                  ? 'Los agentes de IA estan procesando tu solicitud...'
                  : showQuickReplies
                  ? 'Selecciona una opcion arriba o escribe tu respuesta...'
                  : 'Escribe tu mensaje aqui...'
              }
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 rounded-xl bg-[#162544] border border-[#1a3a5c]/50 text-white placeholder-slate-500 focus:outline-none focus:border-[#0068a3]/50 focus:ring-1 focus:ring-[#0068a3]/20 resize-none disabled:opacity-50 transition-all duration-300 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-[#0068a3] to-[#0085c9] text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-[#0068a3]/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            {disabled ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
