import { QueueDashApp } from "@queuedash/ui";
import { NextPage } from "next";
const Page: NextPage = () => {
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : process.env.NEXT_PUBLIC_VERCEL_URL || "localhost";

  const protocol = hostname === "localhost" ? "http" : "https";
  const url = `${protocol}://${hostname}/api/queuedash`;

  return <QueueDashApp apiUrl={url} basename="/queuedash" />;
};

export default Page;
