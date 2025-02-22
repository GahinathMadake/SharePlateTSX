import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  BarChart,
  PieChart,
  LineChart,
  Users,
  Smile,
  Heart,
} from "lucide-react"; // Lucide Icons
import axios from "axios";

interface Faq {
  question: string;
  answer: string;
}

function App() {
  const [faqData, setFaqData] = useState<Faq[]>([]);

  const fetchfaqData = async () => {
    try {
      const Data = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/api/faq`
      );
      setFaqData(Data.data);
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    }
  };

  useEffect(() => {
    fetchfaqData();
  }, []);


  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* FAQ Section */}
      <div className="mb-20">
        {/* FAQ Heading */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          FAQ
        </h2>

        {/* FAQ List */}
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 mb-4 bg-white hover:bg-gray-50 transition-all rounded-lg shadow-sm"
          >
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-6">
                <span className="text-lg font-semibold text-gray-700">
                  {faq.question}
                </span>
                <ChevronUp className="text-green-600 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
