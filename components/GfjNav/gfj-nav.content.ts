import { type Dictionary, t } from "intlayer";

const gfjNavComponentContent = {
  key: "gfj-nav",
  content: {
    home: t({
      en: "HOME",
      ja: "ホーム",
    }),
    member: t({
      en: "MEMBER",
      ja: "メンバー",
    }),
    event: t({
      en: "EVENT",
      ja: "イベント",
    }),
    blog: t({
      en: "BLOG",
      ja: "ブログ",
    }),
  },
} satisfies Dictionary;

export default gfjNavComponentContent;
