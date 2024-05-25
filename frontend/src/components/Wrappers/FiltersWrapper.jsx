const filters = ["pakistan", "India", "Good", "Never"];
const FiltersWrapper = () => {
  const hndleFilter = () => {};
  return (
    <div className="filters w-[100%] overflow-x-scroll overflow-y-hidden flex justify-center py-2 px-10 ps-11">
      {filters.map((filter, index) => {
        return (
          <button
            onClick={hndleFilter}
            key={index}
            className="border border-gray-800 text-gray-800 rounded-[4px] px-3 ml-4 py-1 hover:bg-gray-800 hover:text-gray-100"
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FiltersWrapper;
