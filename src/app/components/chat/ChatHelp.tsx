"use client";

import { GiGraduateCap } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { PiLightbulb } from "react-icons/pi";
import { VscVscodeInsiders } from "react-icons/vsc";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { PromptContext } from "../context/PromptContextProvider";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { ChatOllama } from "@langchain/ollama";

export const dynamic = "force-dynamic";

const chatData = [
  {
    title: "GSC",
    icon: <PiLightbulb />,
    iconColor: "#e2c541",
    prompt: "Show a list of all reports from Global Supply chain business unit",
  },
  {
    title: "Finance",
    icon: <MdEditNote />,
    iconColor: "#c285c7",
    prompt: "Show a list of all reports from Finance",
  },
  {
    title: "Sales & Marketing",
    icon: <VscVscodeInsiders />,
    iconColor: "#e86060",
    prompt: "Show a list of all reports from Sales & Marketing",
  },
  {
    title: "Strategy",
    icon: <GiGraduateCap />,
    iconColor: "#76d0eb",
    prompt: "Show a list of all reports from Strategy",
  },
  {
    title: "Business Ops",
    icon: <GiGraduateCap />,
    iconColor: "#76d0eb",
    prompt: " Show a list of all reports from usiness Ops",
  },
];

//flat to stop streaming action on button click

const ChatHelp = () => {
  const { setPrompt, setIsPending } = useContext(PromptContext);
  const createNewChat = useMutation(api.chats.createChat);
  const sendMessageExt = useMutation(api.messages.sendMessageExt);
  const update = useMutation(api.messages.update);
  const sendMessage = useAction(api.messages.getLLMResponse);
  const router = useRouter();

  const llm = new ChatOllama({
    model: process.env.BASE_MODEL,
    baseUrl: process.env.BASE_MODEL_URL,
    temperature: 0,
    maxRetries: 2,
    // other params...
  });



  const handleSendMessage = async (itemPrompt:string) => {
    if (itemPrompt.trim() === "") return;

    //store prompt into temp and setPrompt to ""
    const temp = itemPrompt;
    setPrompt("");
    setIsPending(true);

    const chatId = await createNewChat({});

    const formatedMessages = await sendMessage({
      role: "user",
      content: temp,
      chatId: chatId,
    });

    // push page to new chat id page
    router.push(`/chat/${chatId}`);

    let response = "";
    const stream = await llm.stream(formatedMessages);

    const newAssistantMessageId = await sendMessageExt({
      role: "assistant",
      content: "",
      chatId: chatId,
    });

    for await (const part of stream) {
      if (part.content === null) {
      }

      if (part !== undefined) {
        response += part.content;

        await update({
          content: response,
          messageId: newAssistantMessageId,
        });
      }
    }
    //set llm output generation pending state to false
    setIsPending(false);
  };
  return (
    <div className="flex flex-row items-center justify-center gap-3 w-full flex-wrap">
      {chatData?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <form>
            <Button
              type="submit"
              variant={"outline"}
              className="rounded-full cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleSendMessage(item.prompt);
              }}
            >
              {item?.icon && (
                <span style={{ color: item?.iconColor }} className="text-xl">
                  {item?.icon}
                </span>
              )}
              <p className="text-sm font-medium tracking-wide">{item?.title}</p>
            </Button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default ChatHelp;
