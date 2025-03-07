import { QueueDashApp } from "@queuedash/ui";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
const Page: NextPage = () => {
  const router = useRouter();
  const hostname = router.query.hostname as string;
  const url = `https://${hostname}/api/queuedash`;

  return <QueueDashApp apiUrl={url} basename="/queuedash" />;
};

export default Page;
