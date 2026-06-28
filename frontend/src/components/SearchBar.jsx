import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value); // check in browser console
  };

  return (
    <div className="relative w-96">
      <Search
        size={18}
        className="absolute left-3 top-3 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search jobs, skills..."
        className="w-full border rounded-full py-2 pl-10 pr-4"
      />
    </div>
  );
}