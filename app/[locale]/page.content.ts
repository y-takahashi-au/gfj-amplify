import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    main: {
      image: t({
        en: "main image",
        ja: "メイン画像",
      }),
      tagline: t({
        en: "Walk with your true self.",
        ja: "あなたの“らしさ”と歩む",
      }),
      mission: {
        title: t({
          en: "Our Missions",
          ja: "私たちの目的",
        }),
        list: [
          t({
            en: "Create a safe and welcoming community for Japanese LGBTQ+ individuals",
            ja: "日本人/LGBTQ+が安心して参加できるコミュニティをつくる",
          }),
          t({
            en: "Promote understanding of diversity in Japan through participation in the Sydney Mardi Gras.",
            ja: "シドニー・Mardi Gras への参加を通じて、日本の多様性への理解を広げる",
          }),
          t({
            en: "Provide opportunities where sexualities and identities are respected and celebrated",
            ja: "セクシュアリティや生き方を尊重し合える機会をつくるる",
          }),
          t({
            en: "Build a supportive network so Japanese LGBTQ+ individuals living abroad never feel isolated",
            ja: "海外で暮らす日本人LGBTQ+が孤立しないネットワークを築く",
          }),
        ],
      },
      descriptions: [
        t({
          en: "In 2022, Australia reached a milestone where more than half of its population consisted of immigrants or children of immigrants. Sydney, the country’s largest city and often described as a melting pot of cultures, is home to people of many different backgrounds, cultures, religions, gender identities, and ways of thinking.",
          ja: "2022年、国民の過半数が移民もしくは移民の親を持つ世代となったオーストラリア。人種の坩堝としても知られるオーストラリア第一の都市シドニーには様々なバックグラウンド、文化、宗教、性自認、考えを持つ人々が暮らしています。",
        }),
        t({
          en: "Australia legalized same-sex marriage in 2017, but even before that, diversity had already been a natural part of everyday life. With so many ethnicities and communities living together, recognizing and respecting different ways of living had long been ingrained in society.",
          ja: "2017年に同性婚が認められたオーストラリアですが、すでに多くの人種が暮らし、多様な生き方を認めることは自然と身に付いていたように思います。",
        }),
        t({
          en: "The diverse ways of life of people living in Australia, the understanding of those around them, and the presence of supportive, safe communities.",
          ja: "オーストラリアで生活する人々の多様な生き方、周囲の理解、安心できるコミュニティ。",
        }),
        t({
          en: "Because we live in Australia every day, we believe there are perspectives we can uniquely share with Japan and the rest of the world. With that belief, Gender Free Japanese was founded.",
          ja: "毎日オーストラリアで生活する私たちだからこそ日本や世界に伝えられることがあると思い、ジェンダーフリージャパニーズが立ち上がりました",
        }),
      ],
    },
  },
} satisfies Dictionary;

export default pageContent;
