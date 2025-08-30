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
      <span className="text-md font-bold text-black mt-2 sm:-mt-2 lg:-mt-4 mb-6 text-center">
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
        {/* Swap order: show Sepia before Blue */}
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
            selected === "blue"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("blue")}
        >
          Blue
        </button>
        {/* Rename Vintage -> Red */}
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "red"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("red")}
        >
          Red
        </button>
      </div>
      {/* Small spacer to align height with Frames card (~4px) */}
      <div className="h-1" aria-hidden="true"></div>
    </div>
  );
}
