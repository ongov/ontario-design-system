// // const StyleDictionary = require('style-dictionary').extend('config.json');
// import StyleDictionary from 'style-dictionary';
// import config from './config.json';

// const styleDictionary = new StyleDictionary(config);

// styleDictionary.buildAllPlatforms();

async () => {
	const StyleDictionary = (await import('style-dictionary')).default;
	const config = await import('./config.json');
	const styleDictionary = new StyleDictionary(config);
	styleDictionary.buildAllPlatforms();
};
