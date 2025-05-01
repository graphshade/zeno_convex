import { v } from "convex/values";
import { internalAction, internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { embed } from "@/lib/otherutils";


export const getReport = query({
  args: { id: v.id("reports") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createReport = mutation({
  args: {
    reportTitle: v.string(),
    businessUnit: v.string(),
    reportOwner: v.string(),
    briefDescription: v.string(),
    detailedDescription: v.string(),
    reportUrl: v.string(),
    context: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const reportId = await ctx.db.insert("reports", {
      reportTitle: args.reportTitle,
      businessUnit: args.businessUnit,
      reportOwner: args.reportOwner,
      briefDescription: args.briefDescription,
      detailedDescription: args.detailedDescription,
      reportUrl: args.reportUrl,
      context: args.context,
    });

    await ctx.scheduler.runAfter(0, internal.reports.createReportEmbedding,{
        reportId: reportId,
        context: args.context as string
    })

    return reportId;
  },
});


export const updateReport = mutation({
  args: {
    reportId: v.id("reports"),
    reportTitle: v.string(),
    businessUnit: v.string(),
    reportOwner: v.string(),
    briefDescription: v.string(),
    detailedDescription: v.string(),
    reportUrl: v.string(),
    context: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reportId, {
      reportTitle: args.reportTitle,
      businessUnit: args.businessUnit,
      reportOwner: args.reportOwner,
      briefDescription: args.briefDescription,
      detailedDescription: args.detailedDescription,
      reportUrl: args.reportUrl,
      context: args.context,
    });

    await ctx.scheduler.runAfter(0, internal.reports.createReportEmbedding,{
        reportId: args.reportId,
        context: args.context as string
    })

    return args.reportId;
  },
});


export const setReportEmbedding = internalMutation({
    args: {
      reportId: v.id('reports'),
      embeddings: v.array(v.number()),
    },
    handler: async (ctx, args) => {
       await ctx.db.patch(args.reportId, {
        embedding: args.embeddings,
      });
  
    },
  });

export const createReportEmbedding = internalAction({
    args: {
      reportId: v.id('reports'),
      context: v.string(),
    },
    handler: async (ctx, args) => {
      const embedding = await embed(args.context)
      await ctx.runMutation(internal.reports.setReportEmbedding, {
        reportId: args.reportId,
        embeddings: embedding
      })
  
    },
  });

export const listReports = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("reports").order("desc").collect();
  },
});
