import { type Dictionary, t } from "intlayer";

const localeSwitcherContent = {
	key: "locale-switcher",
	content: {
		title: t({
			en: "Language",
			ja: undefined
		}),
		selectLanguage: t({
			en: "Select Language",
			ja: undefined
		}),
		currentLanguage: t({
			en: "Current language",
			ja: undefined
		}),
		changeLanguage: t({
			en: "Change language",
			ja: undefined
		}),
	},
} satisfies Dictionary;

export default localeSwitcherContent;




