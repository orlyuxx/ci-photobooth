import React from "react";

export default function Message({
  value = "",
  onChange = () => {},
  showDate = true,
  onToggleDate = () => {},
  className = "",
}) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-start ${className}`}
    >
      <span className="text-md font-bold text-black mb-4 -mt-4 text-center">
        Message
      </span>
      <div className="w-full max-w-xs space-y-2 mt-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 60))}
          placeholder="Type a message..."
          rows={5}
          maxLength={60}
          className="w-full resize-none rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
        <div className="w-full flex justify-end">
          <span className="text-xs text-gray-500 pr-1">
            {Math.min(value.length, 60)}/60 characters
          </span>
        </div>
        <button
          type="button"
          onClick={() => onToggleDate(!showDate)}
          aria-pressed={showDate}
          className={`w-full flex items-center justify-between rounded-md mt-6 px-3 py-2 text-xs transition-colors bg-transparent hover:cursor-pointer ${
            showDate ? "text-black" : "text-gray-600"
          }`}
          title="Toggle date on the photo strip"
        >
          <span>Show date</span>
          <span
            className={`inline-flex h-5 w-10 items-center rounded-full p-0.5 transition-colors ${
              showDate ? "bg-black" : "bg-gray-300"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transform transition-transform ${
                showDate ? "translate-x-5" : "translate-x-0"
              } ${showDate ? "ring-1 ring-white/60" : ""}`}
            />
          </span>
        </button>
        {/* Spacer to align card height with neighbors (invisible) */}
        <div className="h-6" aria-hidden="true"></div>
      </div>
    </div>
  );
}
