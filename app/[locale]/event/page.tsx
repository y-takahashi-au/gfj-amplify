import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { FC } from "react";

const PageContent: FC = () => {
  const content = useIntlayer("event");

  return (
    <main className="p-8">
      <h1>{content.title}</h1>
      <h2>{content.description}</h2>
    </main>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const content = useIntlayer("event");
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
