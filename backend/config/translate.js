const axios = require("axios");
require("dotenv").config();

const translateText = async (text, targetLang) => {
    try {
        const response = await axios.post("https://libretranslate.de/translate", {
            q: text,
            source: "en",
            target: targetLang,
            format: "text",
            api_key: process.env.LIBRETRANSLATE_API_KEY,
        });
        return response.data.translatedText;
    } catch (error) {
        console.error("Translation Error:", error);
        return text;
    }
};

module.exports = translateText;