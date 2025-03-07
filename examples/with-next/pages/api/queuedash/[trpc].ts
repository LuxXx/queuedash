import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@queuedash/api";
import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

export const queue = new Queue("analyzer", {
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
        queue,
        displayName: "Analyzer",
        type: "bullmq" as const,
      },
    ],
  }),
});
