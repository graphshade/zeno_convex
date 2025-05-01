import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getChat = query({
  args: { id: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createChat = mutation({
  args: { userId: v.optional(v.id("users")), title: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chats", {
      userId: args.userId,
      title: args.title,
    });

    return chatId;
  },
});

export const listChats = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    return ctx.db
      .query("chats")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const renameTitle = mutation({
  args: { id: v.id("chats"), title: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const removeChat = mutation({
  args: { id: v.id("chats") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
