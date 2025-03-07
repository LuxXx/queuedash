import { QueueDashApp } from "@queuedash/ui";
import { GetServerSideProps, NextPage } from "next";

const Page: NextPage<{ url: string }> = ({ url }) => {
  return <QueueDashApp apiUrl={url} basename="/queuedash" />;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  function getBaseUrl() {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}/api/queuedash`;
    }

    return `http://localhost:${process.env.PORT ?? 3000}/api/queuedash`;
  }

  return {
    props: {
      url: getBaseUrl(),
    },
  };
};
