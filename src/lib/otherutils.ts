import { OllamaEmbeddings } from "@langchain/ollama";

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something weng wrong";
  }
  return message;
};

export const getRouterBasename = () => {
  const ogTitleMeta = document.querySelector('meta[property="og:root_path"]');
  if (ogTitleMeta && typeof ogTitleMeta.getAttribute('content') === 'string') {
    return ogTitleMeta.getAttribute('content')!;
  } else {
    return '';
  }
};

export const embeddings = new OllamaEmbeddings({
  model: process.env.EMBEDDING_MODEL, 
  baseUrl:process.env.BASE_MODEL_URL,
  requestOptions:{
    num_ctx:1024,
  }
});

export async function embed(text: string) {
  const embedding = await embeddings.embedQuery(text);
  return embedding;
}



