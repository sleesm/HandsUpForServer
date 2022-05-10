require('dotenv').config();
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
const vision = require('@google-cloud/vision');

async function translateText(text, target) {
  const translate = new Translate(); // Creates a client

  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log(translations);
  return translations;
}

async function getText() {
  // get text using vision api
}

async function getObject(buf) {
  try{
    const client = new vision.ImageAnnotatorClient(); // Creates a client

    let [result] = await client.objectLocalization(buf);
    let objects = result.localizedObjectAnnotations;
    if (objects.length === 0) {
      return false;
    }
    else {
      let name = objects[0].name;
      console.log(name);
      return name;
    }
    // use it when we have to consider candidates
    // objects.forEach(object => {
    //     name = object.name;
    //     console.log(`Name: ${object.name}`);
    //     console.log(`Confidence: ${object.score}`);
    //     return;
    // });

  } catch (error) {
      console.error(error);
      return false;
  }
}

module.exports = {
  translateText,
  getText,
  getObject
}