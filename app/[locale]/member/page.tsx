import { type NextPageIntlayer } from "next-intlayer";
import { getLocaleName, Locales, type LocalesValues } from "intlayer";
import Image from "next/image";
import { useLocaleSearch } from "@/components/LocaleSwitcher/UseLocaleSearch";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string;

export type Member = {
  id: number;
  documentId: string;
  name: string;
  description: RichTextBlock[];
  order: number;
  locale: string;
  headshot: Headshot[];
};

export type Headshot = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

// Strapi Blocks (Rich Text) の型
export type RichTextBlock = {
  type: string; // "paragraph"など
  children: { text: string; type: string }[];
};
async function getMember(locale: string): Promise<Member[]> {
  console.log(
    `${STRAPI_URL}/api/members?locale=${locale}&populate=headshot&sort=order`
  );

  const res = await fetch(
    `${STRAPI_URL}/api/members?locale=${locale}&populate=headshot&sort=order`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  console.log(data.data);
  return data.data;
}

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const members = await getMember(locale);

  return (
    <main className="p-8">
      <h1>Mebmer</h1>

      {members.map((member) => (
        <div key={member.id}>
          <p>{member.name}</p>
          <img src={member.headshot[0].url} height={100} width={100} />
        </div>
      ))}
    </main>
  );
};

export default Page;
