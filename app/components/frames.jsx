import React from "react";

export default function Frames({ selected = "classic", onChange = () => {} }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-md font-bold text-black -mt-4 mb-6 text-center">
        Frames
      </span>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg place-items-center">
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "classic"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("classic")}
        >
          Classic
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "film"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("film")}
        >
          Film
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "modern"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("modern")}
        >
          Modern
        </button>
        <button
          className={`font-semibold px-6 py-2 w-32 shadow transition-all text-xs hover:cursor-pointer border-2 ${
            selected === "custom"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
          onClick={() => onChange("custom")}
        >
          Custom
        </button>
        <div className="w-32 h-10"></div>
        <div className="w-32 h-10"></div>
      </div>
    </div>
  );
}
