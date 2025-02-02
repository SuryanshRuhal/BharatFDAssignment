const FAQ = require('../model/faqmodel');
const { translate } = require('@vitalets/google-translate-api');

exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: 'Error adding FAQ', error });
  }
};

exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
  }
};

exports.translateFAQ = async (req, res) => {
  try {
    const { targetLang } = req.body;  
    console.log("Target Language: ", targetLang);
    
    const supportedLanguages = ['en', 'hi', 'bn', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'zh-CN', 'zh-TW', 'ar', 'ru', 'ko', 'tr', 'pl'];  

    if (!supportedLanguages.includes(targetLang)) {
      return res.status(400).json({ message: `Language not supported. Supported languages are: ${supportedLanguages.join(', ')}` });
    }

    const faqs = await FAQ.find();

    const translatedFAQs = await Promise.all(
      faqs.map(async (faq) => {
        try {
          console.log("Translating FAQ: ", faq._id);
          const translatedQuestion = await translate(faq.question, { to: targetLang });
          const translatedAnswer = await translate(faq.answer, { to: targetLang });
          
          console.log("Translated Question: ", translatedQuestion.text);
          console.log("Translated Answer: ", translatedAnswer.text);
          
          return {
            _id: faq._id,
            question: translatedQuestion.text,
            answer: translatedAnswer.text,
          };
        } catch (error) {
          console.error(`Error translating FAQ with ID ${faq._id}: `, error);
          return {
            _id: faq._id,
            question: faq.question, 
            answer: faq.answer,    
          };
        }
      })
    );

    res.status(200).json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ message: 'Translation failed', error });
  }
};
