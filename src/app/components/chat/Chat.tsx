"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEffect, useRef } from "react";
import Message from "./Message";

const Chat = ({ id }: { id: Id<"chats"> }) => {
  const messages = useQuery(api.messages.listMessages, { chatId: id }) || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <div className="max-w-3xl w-[min(90vw,750px)]  mx-auto flex flex-col">
      {messages?.map((message) => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Chat;
