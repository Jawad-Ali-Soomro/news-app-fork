import { FaSearch } from "react-icons/fa";
const SearchWrapper = () => {
  return (
    <div className="flex justify-center w-full mt-5">
      <div className="relative lg:max-w-[75%] lg:min-w-[75%]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-700 font-light">
          <FaSearch />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type to search any thing..."
          required
        />
      </div>
    </div>
  );
};

export default SearchWrapper;
