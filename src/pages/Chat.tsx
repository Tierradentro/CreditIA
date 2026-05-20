import Navbar from '@/components/Navbar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

export default function Chat() {
  const {
    messages,
    isTyping,
    currentAgent,
    currentField,
    quickReplies,
    showQuickReplies,
    sendMessage,
    startNewChat,
    application,
  } = useChat();

  return (
    <div className="h-screen bg-[#0a1628] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col pt-16 max-w-4xl mx-auto w-full">
        <div className="flex-1 flex flex-col bg-[#0f1d32]/50 border-x border-[#1a3a5c]/30 overflow-hidden">
          {/* Chat Header */}
          <ChatHeader
            onNewChat={startNewChat}
            currentAgent={currentAgent}
            applicationStatus={application?.status}
          />

          {/* Messages */}
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
          />

          {/* Input */}
          <ChatInput
            onSend={sendMessage}
            disabled={isTyping}
            currentField={currentField}
            quickReplies={quickReplies}
            showQuickReplies={showQuickReplies}
            isProcessing={false}
          />
        </div>
      </div>
    </div>
  );
}
