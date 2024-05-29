import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search for order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-52 rounded-full bg-yellow-100 px-4 py-2 transition-all duration-300 focus:w-60 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 sm:w-72 sm:focus:w-80"
      />
    </form>
  );
}

export default SearchOrder;
