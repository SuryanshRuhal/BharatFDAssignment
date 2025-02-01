const axios = require("axios");

const TRANSLATE_API = "https://libretranslate.de/translate";  // Use self-hosted if needed

const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(TRANSLATE_API, {
      q: text,
      source: "en",
      target: targetLanguage,
      format: "text",
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; // Return original text if translation fails
  }
};

module.exports = translateText;