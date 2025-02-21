import React, { useState,useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import axios from 'axios';



interface Faq {
  question: string;
  answer: string;
}

function App() {
  


const [faqData, setFaqData] = useState<Faq[]>([]);

const fetchfaqData= async()=>{

  try{
  const Data=await axios.get(`${import.meta.env.VITE_Backend_URL}/api/faq`);
  setFaqData(Data.data);
  }catch (error) {
    console.error("Failed to fetch FAQs", error);
  }

};

useEffect(() => {
  fetchfaqData();
}, []);

  return (
    <div className="max-w-3xl mx-auto py-10">
      
      {/* FAQ Heading */}
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">FAQ</h2>

      {/* FAQ List */}
      {faqData.map((faq, index) => (
        <div key={index} className="border-b border-gray-300 mb-2 bg-white hover:bg-gray-100 transition-all rounded-lg">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer p-4">
              <span className="text-lg font-semibold text-gray-700">{faq.question}</span>
              <ChevronUp className="text-blue-500 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
          </details>
        </div>
      ))}

    </div>
  );
}

export default App;
