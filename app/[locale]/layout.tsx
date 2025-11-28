import { getHTMLTextDir } from "intlayer";
import { type NextLayoutIntlayer } from "next-intlayer";
import { GfjNav } from "@/components/GfjNav/GfjNav";
import { IntlayerServerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={locale === "ja" ? "font-jp" : "font-en"}>
        <IntlayerServerProvider locale={locale}>
          <GfjNav />
          <div className="pt-16 mx-auto mx-2 max-w-4xl">{children}</div>
        </IntlayerServerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
