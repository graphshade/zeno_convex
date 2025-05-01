import ChatInputNew from "@/app/components/chat/ChatInputNew";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import Chat from "@/app/components/chat/Chat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Zeno",
  description: "A data discovery chatbot by Smart Ops",
};

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: Id<"chats"> }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col justify-center item-center pt-5 px-5 pb-[50px]">
      <ScrollArea className="max-h-[calc(100%-150px)] h-full w-full pt-5 px-5 pb-[50px] flex-1  ">
        <Chat id={id} />
      </ScrollArea>
      <div className="self-center fixed bottom-0 left-0 right-0 h-100px flex flex-col justify-center bg-bgPrimary items-center z-50 ">
        <ChatInputNew id={id} />
        <p className="mb-5 mt-3 text-slate-400">Zeno is experimental</p>
      </div>
    </div>
  );
}
