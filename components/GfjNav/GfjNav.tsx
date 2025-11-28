import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";

const GfjNavContent: FC = () => {
  const content = useIntlayer("gfj-nav");

  return (
    <nav className="header-bg text-lg font-bold nav-menu border border-gray-200 rounded-b-2xl shadow-sm">
      <ul className="flex gap-4 h-full">
        <li className="flex-1 flex items-center justify-center">
          <a href="/">
            <img src="/flag.png" alt="" className="earth-icon" />
          </a>
        </li>
        <li className="flex-1 flex items-center justify-center">
          <a href="/member">{content.member.value}</a>
        </li>
        <li className="flex-1 flex items-center justify-center">
          <a href="/event">{content.event.value}</a>
        </li>
      </ul>
    </nav>
  );
};

export const GfjNav: FC = () => {
  return (
    <header className="flex justify-between fixed top-0 left-0 w-full">
      <div />
      <GfjNavContent />
      <LocaleSwitcher />
    </header>
  );
};
