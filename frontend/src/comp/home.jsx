import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FAQForm = () => {
    const navigate = useNavigate();
    const [faq, setFaq] = useState({
        question: "",
        answer: "",
        translations: { question_hi: "", question_bn: "", answer_hi: "", answer_bn: "" },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("translations")) {
            const key = name.split(".")[1];
            setFaq(prev => ({ ...prev, translations: { ...prev.translations, [key]: value } }));
        } else {
            setFaq(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/addfaq", faq);
            alert("🎉 FAQ Added Successfully!");
            setFaq({ question: "", answer: "", translations: { question_hi: "", question_bn: "", answer_hi: "", answer_bn: "" } });
        } catch {
            alert("⚠️ Failed to add FAQ.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">📜 Add a New FAQ</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input type="text" name="question" placeholder="❓ Question" value={faq.question} onChange={handleChange} className="border p-2 w-full rounded-lg" required />
                <input type="text" name="answer" placeholder="💬 Answer" value={faq.answer} onChange={handleChange} className="border p-2 w-full rounded-lg" required />
                <p className="text-sm text-gray-500">✨ Optional Translations:</p>
                <input type="text" name="translations.question_hi" placeholder="🇮🇳 Hindi Question" value={faq.translations.question_hi} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                <input type="text" name="translations.answer_hi" placeholder="🇮🇳 Hindi Answer" value={faq.translations.answer_hi} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                <input type="text" name="translations.question_bn" placeholder="🇧🇩 Bengali Question" value={faq.translations.question_bn} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                <input type="text" name="translations.answer_bn" placeholder="🇧🇩 Bengali Answer" value={faq.translations.answer_bn} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg">➕ Add FAQ</button>
            </form>
            <button onClick={() => navigate("/faqs")} className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg">📚 View FAQs</button>
        </div>
    );
};

export default FAQForm;