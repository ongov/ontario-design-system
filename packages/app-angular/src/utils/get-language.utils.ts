export const getLanguage = () => {
	return document.documentElement.lang;
};

export const isEnglish = () => {
	const lang = getLanguage();
	return lang === 'en';
};
