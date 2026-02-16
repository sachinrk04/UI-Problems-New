import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatList = React.memo(({ messages }: any) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
      {!!messages?.length &&
        messages?.map((msg: any) => <ChatMessage key={msg.id} message={msg} />)}
      <div ref={bottomRef} />
    </div>
  );
});

export default ChatList;
