import { ChatOllama } from "@langchain/ollama";



export type messageProp = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const llm_old = new ChatOllama({
  model: process.env.BASE_MODEL,
  baseUrl: process.env.BASE_MODEL_URL,
  temperature: 0,
  maxRetries: 2,
  // other params...
});
