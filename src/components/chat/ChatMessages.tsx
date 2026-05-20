import { useEffect, useRef } from 'react';
import { User, MessageSquare } from 'lucide-react';
import type { ChatMessage } from '@/types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter: show only user messages and chat agent (Sofia) messages
  // Hide analyst and risk agent messages from the client chat
  const visibleMessages = messages.filter(
    (msg) => msg.role === 'user' || msg.agent === 'chat'
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {visibleMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#0068a3]/10 flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-[#0068a3]" />
          </div>
          <h3 className="text-white font-semibold mb-2">Inicia tu solicitud</h3>
          <p className="text-slate-500 text-sm max-w-md">
            Sofia te guiara paso a paso para completar tu solicitud de credito.
            Solo necesitas responder algunas preguntas.
          </p>
        </div>
      )}

      {visibleMessages.map((message, index) => {
        const isUser = message.role === 'user';

        return (
          <div
            key={message.id}
            className={`flex gap-3 message-appear ${isUser ? 'flex-row-reverse' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                isUser
                  ? 'bg-[#c9a33d]/20'
                  : 'bg-[#0068a3]/20 text-[#0068a3]'
              }`}
            >
              {isUser ? (
                <User className="w-4 h-4 text-[#c9a33d]" />
              ) : (
                <MessageSquare className="w-4 h-4" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium ${isUser ? 'text-[#c9a33d]' : 'text-slate-400'}`}>
                  {isUser ? 'Tu' : 'Sofia'}
                </span>
                <span className="text-[10px] text-slate-600">
                  {message.timestamp.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div
                className={`inline-block text-left px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#c9a33d]/10 border border-[#c9a33d]/20 text-white'
                    : 'bg-[#162544] border border-[#1a3a5c]/50 border-l-2 border-l-[#0068a3] text-slate-300'
                }`}
              >
                {formatContent(message.content)}
              </div>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator - always show as Sofia since user only sees chat agent */}
      {isTyping && (
        <div className="flex gap-3 message-appear">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0068a3]/20 flex items-center justify-center text-[#0068a3]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="max-w-[80%]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-slate-400">Sofia</span>
              <span className="text-[10px] text-[#c9a33d] agent-pulse">Escribiendo...</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#162544] border border-[#1a3a5c]/50">
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
