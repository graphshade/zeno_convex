import { v,} from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  query,mutation,
  internalAction,
} from "./_generated/server";
import { api, internal } from "./_generated/api";
import { embed } from "@/lib/otherutils";
import { Doc } from "./_generated/dataModel";

export const listMessages = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
      .collect();
  },
});



export const sendMessageExt = mutation({
  args: {
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const newMessageId = await ctx.db.insert("messages", {
      role: args.role,
      content: args.content,
      chatId: args.chatId,
    });

    return newMessageId;
  },
});


export const sendMessage = internalMutation({
  args: {
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const newMessageId = await ctx.db.insert("messages", {
      role: args.role,
      content: args.content,
      chatId: args.chatId,
    });

    return newMessageId;
  },
});

export const retriveRecentMessages = internalQuery({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
      .order("desc")
      .take(3);

    return messages;
  },
});


export const retrievePromptContext = internalAction({
    args: {
      context: v.string(),
    },
    handler: async (ctx, args) => {
      const embedding = await embed(args.context)
      const promptContext = await ctx.vectorSearch("reports", "by_embedding",{
        vector:embedding,
        limit: 5,
      });

      const reports =  await Promise.all(
        promptContext.map(async (richcontext) => {
          const report = await ctx.runQuery(api.reports.getReport, {
            id: richcontext._id,
          });
          return report
        })
        .filter(Boolean)) as Doc<"reports">[];
      return reports
  
    },
  });

export const getLLMResponse = action({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    // send user message
    await ctx.runMutation(internal.messages.sendMessage, {
      role: args.role,
      content: args.content,
      chatId: args.chatId,
    });

    const messages = await ctx.runQuery(
      internal.messages.retriveRecentMessages,
      {
        chatId: args.chatId,
      }
    );

    messages.reverse();

    const formattedMessages:{"role":string, "content":string}[] = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const richContext = await ctx.runAction(internal.messages.retrievePromptContext,{
    context: args.content,
    })
    
    const repoContext:string = richContext.map(obj => `Report name: ${obj.reportTitle} About Report: ${obj.context}`).join('; ')
    
    formattedMessages.unshift({
      role: "system",
      content: `You're Data Bot called Zeno. Your task is use the context below to
       help users find data resources. Provide a brief description of the data resource and how
      the user can get access to the data resource.Make sure to include report title as hyperlinked text.
        If you find more than one data resource that matches the users question, follow up with 
        clarifying questions to guide the user to the data resource that they want. If you do not find any report,
        only respond that you did not find the report and ask the user to clarify their question.
      
      context: ${repoContext}`,
    });

    return formattedMessages

  },
});

export const update = mutation({
  args: { messageId: v.id("messages"), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      content: args.content,
    });
  },
});



export const updateInternal = internalMutation({
  args: { messageId: v.id("messages"), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      content: args.content,
    });
  },
});

