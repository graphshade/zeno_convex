"use client";

import React, { useContext } from "react";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImArrowUpRight2 } from "react-icons/im";
import { IoStop } from "react-icons/io5";
import { PromptContext } from "../context/PromptContextProvider";
import { useAction, useMutation, } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { ChatOllama } from "@langchain/ollama";

export const dynamic = "force-dynamic";

//flat to stop streaming action on button click
let stop_stream_flag: boolean = false;


const ChatInputNew = ({ id }: { id?: Id<"chats"> }) => {
  const { prompt, setPrompt, ispending, setIsPending } = useContext(PromptContext);
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



  const handleSendMessage = async () => {

    if (prompt.trim() === "") return;

    //store prompt into temp and setPrompt to ""
    const temp = prompt;
    setPrompt("");
    setIsPending(true);



    //logic to handle if there is no chat id. i.e first prompt from home
    if (!id) {
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
            messageId: newAssistantMessageId
          });
        }

        //break if stop_stream_flag is true
        if (stop_stream_flag) {
          break;
        }
      }

      //set llm output generation pending state to false
      setIsPending(false);

    }

    //logic to handle chat when chat id is available, that is chat from chat[id] page
    if (id) {
      const chatId = id;
      const formatedMessages = await sendMessage({
        role: "user",
        content: temp,
        chatId: chatId,
      });

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
            messageId: newAssistantMessageId
          });
        }

        //break if stop_stream_flag is true
        if (stop_stream_flag) {
          break;
        }
      }
      setIsPending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      //reset stop_stream_flag to default before handling message
      stop_stream_flag = false;
      handleSendMessage();

    }
  };
  return (
    <div className={ispending ? "boxcard" : ""}>
      <Card className="w-[min(90vw,750px)] py-2 pr-3 rounded-2xl gap-2 min-h-[5px] max-h-40 ">
        <form className="flex flex-row justify-center items-center z-[1000]">
          <Textarea
            className="mx-0 my-0 border-0 resize-none px-3 pb-2 min-h-[5px] max-h-35 w-[min(85vw,700px)]"
            placeholder="Ask something"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={ispending}
          />

          {!ispending ? (
            <Button
              type="submit"
              disabled={!prompt}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                stop_stream_flag = false;
                handleSendMessage();
              }
              }
              className={`p-2.5 w-10 h-10 my-0 round-sm text-textBase flex items-center justify-center transition-transform duration-200 bg-smartops hover:opacity-80 hover:shadow-lg hover:bg-smartops  disabled:bg-primary/30 self-center`}
            >
              <ImArrowUpRight2 className="rotate-45 text-sm text-textBase/80 my-0" />

            </Button>) : (

            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                stop_stream_flag = true;
                setIsPending(false);
              }}
              className={`p-2.5 w-10 h-10 my-0 round-sm text-textBase flex items-center justify-center transition-transform duration-200 bg-smartops hover:opacity-80 hover:shadow-lg hover:bg-smartops  disabled:bg-primary/30 self-center`}
            >

              <IoStop className="text-sm text-textBase/80 my-0 " />

            </Button>)
          }
        </form>
      </Card>
    </div>
  );
};

export default ChatInputNew;
