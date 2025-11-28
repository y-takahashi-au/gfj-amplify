import { type Dictionary, t } from "intlayer";

const AboutUs = {
  key: "about-us",
  content: {
    title: t({
      en: "About Us",
      ja: "私たちについて",
    }),
    description: t({
      en: "In 2023, aiming to participate in Sydney WorldPride, four representatives—Ayaka, Koki, Yuji, and Masaru—founded Gender Free Japanese. Ahead of WorldPride, we decided to take part as a float in the “Sydney Gay and Lesbian Mardi Gras,” a major LGBTQ event held every February in Sydney. Starting from zero, we gathered float members in Sydney and successfully joined the parade held in March 2022.",
      ja: "2023年シドニーワールドプライドへの参加を目標にAyaka,Koki,Yuji,Masaruの代表4名でGender Free Japaneseを立ち上げました。ワールドプライドに先がけ、毎年2月に行われるシドニーのLGBTビックイベント「シドニー・ゲイ・アンド・レズビアン・マルディグラ」のパレードにフロートとして出場することを決意。ゼロスタートでシドニーでフロートメンバーを集め、2022年3月に行われたパレードに無事、出場を果たしました。",
    }),
  },
} satisfies Dictionary;

export default AboutUs;
