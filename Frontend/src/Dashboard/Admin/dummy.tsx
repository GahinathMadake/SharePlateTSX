import { useState } from "react";
import axios from "axios";

export default function DonorMatch() {
  const [donorId, setDonorId] = useState("");
  const [matches, setMatches] = useState<{ name: string; distance: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      console.log(donorId);
      const response = await axios.post("http://localhost:5000/api/donations/match-ngos", 
        { donorId },
        { withCredentials: true }
      );
      setMatches(response.data.matches);
    } catch (err) {
      setError("Failed to fetch matches");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Find Matching NGOs</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={donorId}
          onChange={(e) => setDonorId(e.target.value)}
          placeholder="Enter Donor ID"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Find NGOs
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {matches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Matching NGOs:</h3>
          <ul>
            {matches.map((ngo, index) => (
              <li key={index} className="p-2 border-b">
                {ngo.name} - {ngo.distance.toFixed(2)} km away
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
