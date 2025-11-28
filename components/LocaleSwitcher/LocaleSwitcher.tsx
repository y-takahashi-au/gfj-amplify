"use client";

import { getHTMLTextDir, getLocalizedUrl } from "intlayer";
import Link from "next/link";
import {
  useIntlayer,
  useLocale,
  useLocaleStorage,
  IntlayerClientProvider,
} from "next-intlayer";
import { type FC, useState } from "react";
import { useLocaleSearch } from "@/components/LocaleSwitcher/UseLocaleSearch";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const [isOpen, setIsOpen] = useState(false);
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocale } = useLocaleStorage();
  const { searchResults } = useLocaleSearch(availableLocales, locale);

  return (
    <IntlayerClientProvider locale={locale}>
      <div
        className="relative w-auto rounded-xl p-2"
        aria-label={localeSwitcherLabel.value}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between"
          aria-expanded={isOpen}
        >
          {/* <span className="px-2">{getLocaleName(locale)}</span>
        <span className="text-sm">▼</span> */}
          <img src="/earth.svg" alt="" className="earth-icon" />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 z-10 mt-1 min-w-60 rounded-xl bg-neutral-900 shadow-lg text-white">
            <ul className="max-h-[80vh] divide-y overflow-y-auto opacity-80 backdrop-blur">
              {searchResults.map(
                ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                  <li key={localeItem} className="p-1">
                    <Link
                      href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                      className={`flex w-full flex-row items-center justify-between gap-3 rounded-xl p-2 text-left ${
                        locale === localeItem
                          ? "bg-neutral-800"
                          : "cursor-pointer hover:bg-neutral-800"
                      }`}
                      onClick={() => {
                        setLocale(localeItem);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex flex-col">
                        <span
                          dir={getHTMLTextDir(localeItem)}
                          lang={localeItem}
                        >
                          {ownLocaleName}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {currentLocaleName}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">
                        {localeItem.toUpperCase()}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </IntlayerClientProvider>
  );
};
