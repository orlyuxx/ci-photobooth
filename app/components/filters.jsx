import React from "react";

export default function Filters({
  selected = "none",
  onChange = () => {},
  className = "",
}) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-md font-bold text-black -mt-4 mb-6 text-center">
        Filters
      </span>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg place-items-center">
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "none"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("none")}
        >
          None
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "grayscale"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("grayscale")}
        >
          Grayscale
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "brightness"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("brightness")}
        >
          Brightness
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "contrast"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("contrast")}
        >
          Contrast
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "sepia"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("sepia")}
        >
          Sepia
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "vintage"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("vintage")}
        >
          Vintage
        </button>
      </div>
    </div>
  );
}
