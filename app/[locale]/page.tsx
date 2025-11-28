import Image from "next/image";
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import type {
  FC,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { AboutUs } from "@/components/AboutUs/AboutUs";

const PageContent: FC = () => {
  const content = useIntlayer("page");
  const tests = content.main.mission.list;
  const descriptions = content.main.descriptions;

  return (
    <div className="items-center justify-center font-sans">
      <Image
        src="/main.png"
        alt={content.main.image.value}
        width={1000}
        height={200}
        priority
      />
      <h3 className="pt-5 text-6xl font-bold bg-[linear-gradient(90deg,#ef4444,#f97316,#facc15,#22c55e,#3b82f6,#6366f1,#8b5cf6)] bg-clip-text text-transparent">
        {content.main.tagline.value}
      </h3>
      <h5 className="pt-5 text-xl font-bold ">
        {content.main.mission.title.value}
      </h5>
      <ul className="list-disc pl-6 space-y-2">
        {tests.map((item: { value: string }, index: Key) => (
          <li key={index}>{item.value}</li>
        ))}
      </ul>
      {descriptions.map((description: { value: string }, index: Key) => (
        <p key={index} className="pt-5">
          {description.value}
        </p>
      ))}
    </div>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <main>
          <PageContent />
          <AboutUs />
        </main>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
