import React from 'react';
import { ChevronUp } from 'lucide-react';

const faqData = [
  { question: "Why should I have a website?", answer: "Having a website helps establish your online presence and reach a wider audience." },
  { question: "Is Stacker right for me?", answer: "Stacker is suitable for users looking for an easy-to-use website builder." },
  { question: "Is it easy to use?", answer: "Yes, Stacker is designed to be user-friendly." },
  { question: "How to start my website?", answer: "You can start by signing up on Stacker and choosing a template." },
  { question: "Can someone make my website?", answer: "Yes, you can hire professionals or use Stacker's services." },
  { question: "How to get a custom domain?", answer: "You can purchase a custom domain through Stacker or other domain registrars." },
  { question: "How to begin online selling?", answer: "Start by setting up an e-commerce section on your website." },
  { question: "Can I cancel at any time?", answer: "Yes, you can cancel your subscription at any time." }
];

function App() {
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
