const SearchBar = ({
    categories,
    keyword,
    setKeyword,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    handleSearch
  }: {
    categories: string[];
    keyword: string;
    setKeyword: (keyword: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedPriority: string;
    setSelectedPriority: (priority: string) => void;
    handleSearch: () => void;
  }) => {
    return (
      <div className="grid grid-rows-3 gap-3 mt-3 lg:grid-rows-1 lg:grid-cols-5">
        <input
          type="text"
          placeholder="Search note..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // Update keyword state
          className="col-span-2 p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <select
          className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
        >
          <option value="all">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)} // Update selected priority
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button 
          onClick={handleSearch} // Trigger the search when clicked
          className="col-span-2 px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg lg:col-span-1"
        >
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  