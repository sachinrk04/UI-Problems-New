import React from "react";

const ChatMessage = React.memo(({ message }: any) => {
  const isMe = message.user === "Me";
  
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-2 py-1 rounded-sm text-xs break-words
        ${
          isMe
            ? "bg-white text-green-600 rounded-br-none shadow-[0_2px_10px_rgba(22,163,74,0.3)]"
            : "bg-white text-primary rounded-bl-none shadow-[0_2px_10px_rgba(249,117,21,0.4)]"
        }`}
      >
        {!isMe && (
          <p className="text-xs text-primary font-bold">{message.user} :</p>
        )}
        {message.text}
      </div>
    </div>
  );
});

export default ChatMessage;
