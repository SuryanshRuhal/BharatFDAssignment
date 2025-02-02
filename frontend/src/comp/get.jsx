import React, { useState } from "react";
import axios from "axios";

const FAQGet = () => {
    const [faqs, setFaqs] = useState([]);
    const [language, setLanguage] = useState("en");
    const [error, setError] = useState("");

    const fetchFAQs = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/all`);
            console.log(data);
            setFaqs(data);
            setError("");
        } catch {
            setError("Failed to fetch FAQs. Please try again.");
            setFaqs([]);
        }
    };

    const fetchTranslatedFAQs = async (lang) => {
        try {
            const { data } = await axios.post(`http://localhost:8080/api/translate`, { targetLang: lang });
            console.log(data);
            setFaqs(data);
            setError("");
        } catch {
            setError("Failed to fetch translated FAQs. Please try again.");
            setFaqs([]);
        }
    };

    const handleLanguageChange = async (e) => {
        const selectedLang = e.target.value;
        setLanguage(selectedLang);

        if (selectedLang === "en") {
            await fetchFAQs();
        } else {
            await fetchTranslatedFAQs(selectedLang);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">📚 FAQs</h2>
            <div className="flex justify-between items-center mt-4">
                <select value={language} onChange={handleLanguageChange} className="border p-2 rounded-lg">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="pt">Portuguese</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="zh-CN">Chinese (Simplified)</option>
                    <option value="zh-TW">Chinese (Traditional)</option>
                    <option value="ar">Arabic</option>
                    <option value="ru">Russian</option>
                    <option value="ko">Korean</option>
                    <option value="tr">Turkish</option>
                    <option value="pl">Polish</option>
                </select>
                <button className="px-4 py-2 bg-purple-300 text-white rounded-lg hover:bg-pink-200" onClick={fetchFAQs}>🔍 View FAQs</button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                    <div key={faq._id} className="p-4 border rounded-lg shadow-md">
                        <p className="font-semibold">Q: {faq.question}</p>
                        <p className="text-gray-600">A: {faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQGet;
