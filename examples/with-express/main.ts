import express from "express";
import { Queue } from "bullmq";
import IORedis from "ioredis";

import { createQueueDashExpressMiddleware } from "@queuedash/api";

const app = express();

export const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

export const queue = new Queue("analyzer", {
  connection,
});

app.use(
  "/queuedash",
  createQueueDashExpressMiddleware({
    ctx: {
      queues: [
        {
          queue,
          displayName: "Analyzer",
          type: "bullmq" as const,
        },
      ],
    },
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
  console.log("Visit http://localhost:3000/queuedash");
});
