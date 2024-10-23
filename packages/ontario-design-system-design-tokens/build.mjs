import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary('config.json');
await sd.hasInitialized;

sd.buildAllPlatforms();
