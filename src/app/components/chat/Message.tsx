import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Markdown } from "./Markdown";

type Props = {
  message: Doc<"messages">;
};

const Message = ({ message }: Props) => {
  const isLLM = message.role === "assistant";

  return (
    <div
      className={`flex flex-col space-x-2.5 md:space-x-5 py-5 text-primary  ${
        isLLM ? "items-start" : "items-end"
      }`}
    >
      <div
        className={`${
          isLLM ? "bg-zinc-200" : "bg-zinc-200 "
        } px-4 py-2 text-base font-large leading-7 rounded-sm tracking-wide max-w-full whitespace-pre-wrap break-words`}
      >
        <Markdown allowHtml={true} latex={true}>
          {message.content}
        </Markdown>
      </div>
    </div>
  );
};

export default Message;
