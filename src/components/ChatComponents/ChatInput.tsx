import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ChatInput = ({ onSend }: any) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend({
      id: Date.now(),
      user: "Me",
      text,
      timestamp: Date.now(),
    });

    setText("");
  };

  return (
    <div className="p-3 bg-primary/20 border-t border-primary/70 flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-3xl bg-white text-primary outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        onClick={handleSend}
        className="px-5 py-2 rounded-3xl bg-primary/90 hover:bg-primary/70 active:scale-95 transition text-sm font-medium"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
