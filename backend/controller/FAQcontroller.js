const FAQ = require("../model/faqmodel");
const translateText = require("../config/translate");

// Create FAQ with translations
const createFAQ = async (req, res) => {
  try {
    const { question, answer, translations } = req.body;

    // Translate question if translations are not provided
    const question_hi = translations?.question_hi || await translateText(question, "hi");
    const question_bn = translations?.question_bn || await translateText(question, "bn");
    const answer_hi = translations?.answer_hi || await translateText(answer, "hi");
    const answer_bn = translations?.answer_bn || await translateText(answer, "bn");

    // Create a new FAQ document
    const newFAQ = new FAQ({ 
      question, 
      question_hi, 
      question_bn, 
      answer, 
      answer_hi, 
      answer_bn 
    });

    await newFAQ.save();

    res.status(201).json({ message: "FAQ created successfully!", newFAQ });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get FAQs with language support
const getFAQs = async (req, res) => {
  try {
    const { lang } = req.query;
    let faqs = await FAQ.find();

    if (lang) {
      faqs = faqs.map(faq => ({
        question: faq[`question_${lang}`] || faq.question,
        answer: faq[`answer_${lang}`] || faq.answer,
      }));
    }

    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFAQ, getFAQs };
