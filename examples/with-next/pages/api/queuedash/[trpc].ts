import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@queuedash/api";
import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

export const analyzeFileQueue = new Queue("analyzeFile", {
  connection,
});

export const analyzeProjectQueue = new Queue("analyzeProject", {
  connection,
});

export default trpcNext.createNextApiHandler({
  router: appRouter,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
  batching: {
    enabled: true,
  },
  createContext: () => ({
    queues: [
      {
        queue: analyzeFileQueue,
        displayName: "Analyze File",
        type: "bullmq" as const,
      },
      {
        queue: analyzeProjectQueue,
        displayName: "Analyze Project",
        type: "bullmq" as const,
      },
    ],
  }),
});
