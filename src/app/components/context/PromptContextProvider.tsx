"use client";

// TextareaContext.tsx
import React, { createContext, useContext, useState, } from "react";

// Define the type for the context state
interface PromptContextType {
  prompt: string;
  setPrompt: (value: string) => void;
  ispending: boolean;
  setIsPending: (value: boolean) => void;

}

// Create the context with a default value (null)
export const PromptContext = createContext<PromptContextType>(
  {} as PromptContextType
);

export const PromptContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [prompt, setPrompt] = useState("");
  const [ispending, setIsPending] = useState(false);

  return (
    <PromptContext.Provider value={{ prompt, setPrompt, ispending, setIsPending }}>
      {children}
    </PromptContext.Provider>
  );
};

// Custom hook to use the context easily in other components
export const usePrompt = () => {
  const context = useContext(PromptContext);
  return context;
};
