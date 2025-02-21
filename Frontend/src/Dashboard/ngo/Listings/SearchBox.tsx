import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; 
import { Button } from "@/components/ui/button";

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search logic here (e.g., call an API or filter data)
  };

  return (
    <div className="flex items-center w-full max-w-md">
        
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Enter Location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-lg border border-gray-300"
        />
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition duration-300"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBox;