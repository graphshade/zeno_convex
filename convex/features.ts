import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createFeatureRequest = mutation({
  args: { requesterName: v.string(),
    requesterEmail: v.string(),
    featureSummary: v.string(),
    featureDescription: v.string(),
  },
  handler: async (ctx, args) => {
    const featureId = await ctx.db.insert("features", {
        requesterName: args.requesterName,
        requesterEmail: args.requesterEmail,
        featureSummary: args.featureSummary,
        featureDescription: args.featureDescription,
    });

    return featureId;
  },
});
