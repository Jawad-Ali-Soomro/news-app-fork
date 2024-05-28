const Loader = ({ size = 20 }) => {
  const spinnerSize = `${size}px`;
  const borderSize = `${Math.floor(size / 6)}px`; // Adjust border size relative to the spinner size
  return (
    // <div className="w-full flex justify-center items-center">
    //   <div className="w-12 h-12 rounded-full animate-spin border-[5px] border-solid border-yellow-500 border-t-transparent"></div>
    // </div>
    <div className="w-full flex justify-center items-center">
      <div
        className="rounded-full animate-spin"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: borderSize,
          borderStyle: "solid",
          borderColor: "yellow-500 transparent transparent transparent",
        }}
      ></div>
    </div>
  );
};

export default Loader;
