interface ColorSelectorProps {
  selected: string | null;
  setSelected: (color: string) => void;
}

const ColorSelector = ({ selected, setSelected }: ColorSelectorProps) => {
  return (
    <>
      <h1 className="w-full text-xl text-black font-bold p-4">Color</h1>
      <div className="flex gap-4 text-sm font-semibold px-4">
        <button
          onClick={() => setSelected("white")}
          className={`w-8 h-8 border-2 rounded-full flex justify-center items-center transition-colors duration-200 bg-white cursor-pointer ${
            selected === "white" ? "border-[#ba933e]" : "border-gray-400"
          }`}
        ></button>
        <button
          onClick={() => setSelected("black")}
          className={`w-8 h-8 border-2 rounded-full flex justify-center items-center transition-colors duration-200 bg-gray-600 cursor-pointer ${
            selected === "black" ? "border-[#ba933e]" : "border-gray-400"
          }`}
        ></button>
      </div>
    </>
  );
};

export default ColorSelector;
