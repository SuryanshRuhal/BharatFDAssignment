import React, { useState } from "react";
import axios from "axios";

const FAQGet = () => {
    const [faqs, setFaqs] = useState([]);
    const [language, setLanguage] = useState("en");
    const [error, setError] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedFaq, setEditedFaq] = useState({});

    const fetchFAQs = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/getfaqs?lang=${language}`);
            setFaqs(data);
            setError("");
        } catch {
            setError("Failed to fetch FAQs. Please try again.");
            setFaqs([]);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedFaq(faqs[index]);
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/updatefaq/${id}`, editedFaq);
            setFaqs(prev => prev.map((faq, i) => (i === editIndex ? editedFaq : faq)));
            setEditIndex(null);
        } catch {
            alert("Failed to update FAQ.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">📚 FAQs</h2>
            <div className="flex justify-between items-center mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={fetchFAQs}>🔍 View FAQs</button>
                <select value={language} onChange={e => setLanguage(e.target.value)} className="border p-2 rounded-lg">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                </select>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-6 space-y-4">
                {faqs.map((faq, index) => (
                    <div key={faq._id} className="p-4 border rounded-lg shadow-md">
                        
                            <>
                                <p className="font-semibold">Q: {faq.question}</p>
                                <p className="text-gray-600">A: {faq.answer}</p>
                                 </>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQGet;