import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.optional(v.string()),
    password: v.string(),
    salt: v.string(),
  }),

  chats: defineTable({
    userId: v.optional(v.id("users")),
    title: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  messages: defineTable({
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    chatId: v.id("chats"),
  }).index("by_chatId", ["chatId"]),

  feedbacks: defineTable({
    feedbackSummary: v.optional(v.union(v.literal("good"), v.literal("bad"))),
    feedbackDetail: v.optional(v.string()),
    messageId: v.id("messages"),
  }).index("by_messageId", ["messageId"]),

  features: defineTable({
    requesterName: v.string(),
    requesterEmail: v.string(),
    featureSummary: v.string(),
    featureDescription: v.string(),

  }).index("by_requesterEmail", ["requesterEmail"]),

  reports: defineTable({
    reportTitle: v.string(),
    businessUnit: v.string(),
    reportOwner: v.string(),
    briefDescription: v.string(),
    detailedDescription: v.string(),
    reportUrl: v.string(),
    context: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
  }).index("by_reportTitle", ["reportTitle"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1024,
      filterFields: ["businessUnit"],
    })
});
