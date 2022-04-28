require('dotenv').config();
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

async function translateText(text, target) {
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
//   translations.forEach((translation, i) => {
//     console.log(`${text} => (${target}) ${translation}`);
//   });
  return translations;

}

module.exports = {translateText}