import { useState } from "react";
import { Button } from "@/components/ui/button";
import fraud from "@/assets/fraud.jpg";

export default function Fraud() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Hide component when isVisible is false

  return (
    <section className="relative flex items-center justify-center p-6">
      <div className="border shadow-sm rounded-sm p-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-gray-800">Reports to Fraud</h2>
          <p className="text-gray-600">
            Beware! Some NGOs misuse donated food for personal gain or resale, depriving the needy. Report fraud to ensure accountability and justice!
          </p>
          <Button
            className="bg-blue-500 text-white px-6 py-2"
            onClick={() => setIsVisible(false)}
          >
            Continue
          </Button>
        </div>
        <img src={fraud} alt="Hero" className="md:w-1/2 w-1/2 min-w-[400px] rounded-sm" />
      </div>
    </section>
  );
}
