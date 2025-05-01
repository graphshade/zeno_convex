"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import { PromptContext } from "../context/PromptContextProvider";

const NewChat = () => {
  const { setPrompt } = useContext(PromptContext);
  return (
    //leveraging server actions instead of making this a client component
    <Link href="/">
      <Button
        type="submit"
        variant={"ghost"}
        size={"icon"}
        className="text-slate-500 hover:shadow-sm"
        onClick={() => setPrompt("")}
      >
        <FaRegPenToSquare size={64} />
      </Button>
    </Link>
  );
};

export default NewChat;
