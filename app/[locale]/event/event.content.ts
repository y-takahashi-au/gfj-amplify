import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "event",
  content: {
    title: t({
      en: "event",
      ja: "イベント",
    }),
    description: t({
      en: "This page is currently under development.",
      ja: "準備中です",
    }),
  },
} satisfies Dictionary;

export default pageContent;
