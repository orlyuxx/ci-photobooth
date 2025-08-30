import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";

export default function Frames({
  selected = "classic",
  onChange = () => {},
  customSettings = {},
  onCustomSettingsChange = () => {},
  onPopoverOpenChange = undefined,
}) {
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const borderColorRef = useRef(null);
  const backgroundColorRef = useRef(null);
  const borderBtnRef = useRef(null);
  const backgroundBtnRef = useRef(null);
  const borderPopoverRef = useRef(null);
  const backgroundPopoverRef = useRef(null);
  const [borderPos, setBorderPos] = useState({ top: 0, left: 0 });
  const [backgroundPos, setBackgroundPos] = useState({ top: 0, left: 0 });

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        borderColorRef.current &&
        !borderColorRef.current.contains(event.target)
      ) {
        if (
          borderPopoverRef.current &&
          borderPopoverRef.current.contains(event.target)
        ) {
          return;
        }
        setShowBorderColorPicker(false);
      }
      if (
        backgroundColorRef.current &&
        !backgroundColorRef.current.contains(event.target)
      ) {
        if (
          backgroundPopoverRef.current &&
          backgroundPopoverRef.current.contains(event.target)
        ) {
          return;
        }
        setShowBackgroundColorPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Notify parent when any picker visibility changes
  useEffect(() => {
    if (typeof onPopoverOpenChange === "function") {
      onPopoverOpenChange(showBorderColorPicker || showBackgroundColorPicker);
    }
  }, [showBorderColorPicker, showBackgroundColorPicker, onPopoverOpenChange]);

  // Position calculators
  useEffect(() => {
    const updateBorderPos = () => {
      const el = borderBtnRef.current || borderColorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gap = 8;
      const left = Math.min(
        Math.max(8, rect.left),
        window.innerWidth - 240 // approximate picker width
      );
      const top = Math.min(
        rect.bottom + gap,
        window.innerHeight - 220 // approximate picker height
      );
      setBorderPos({ top, left });
    };
    if (showBorderColorPicker) {
      updateBorderPos();
      window.addEventListener("resize", updateBorderPos);
      window.addEventListener("scroll", updateBorderPos, true);
      return () => {
        window.removeEventListener("resize", updateBorderPos);
        window.removeEventListener("scroll", updateBorderPos, true);
      };
    }
  }, [showBorderColorPicker]);

  useEffect(() => {
    const updateBackgroundPos = () => {
      const el = backgroundBtnRef.current || backgroundColorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gap = 8;
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - 240);
      const top = Math.min(rect.bottom + gap, window.innerHeight - 220);
      setBackgroundPos({ top, left });
    };
    if (showBackgroundColorPicker) {
      updateBackgroundPos();
      window.addEventListener("resize", updateBackgroundPos);
      window.addEventListener("scroll", updateBackgroundPos, true);
      return () => {
        window.removeEventListener("resize", updateBackgroundPos);
        window.removeEventListener("scroll", updateBackgroundPos, true);
      };
    }
  }, [showBackgroundColorPicker]);
  const isPickerOpen = showBorderColorPicker || showBackgroundColorPicker;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center relative ${
        isPickerOpen ? "z-50" : ""
      }`}
    >
      <span className="text-md font-bold text-black mt-2 sm:-mt-2 lg:-mt-4 mb-6 text-center">
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
        {/* Replace the two invisible divs with Custom Options if custom is selected */}
        {selected === "custom" ? (
          <div className="col-span-2 w-full">
            {/* Custom Options start here */}
            <div className="w-full max-w-lg">
              {/* Border Color & Background Color side by side */}
              <div className="mb-3 flex flex-col sm:flex-row gap-3 sm:gap-6 items-end w-full">
                {/* Border Color */}
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-medium text-gray-600 mb-1 block">
                    Border Color
                  </span>
                  <div className="relative" ref={borderColorRef}>
                    <button
                      ref={borderBtnRef}
                      className="w-20 sm:w-24 h-5 shadow-sm transition-all hover:border-gray-600 hover:cursor-pointer border border-black"
                      style={{
                        backgroundColor: customSettings.borderColor || "black",
                        backgroundImage: "none",
                        backgroundSize: "8px 8px",
                        backgroundPosition: "0 0, 4px 4px",
                      }}
                      onClick={() => {
                        setShowBorderColorPicker((prev) => {
                          if (!prev) setShowBackgroundColorPicker(false);
                          return !prev;
                        });
                      }}
                    />
                    {showBorderColorPicker &&
                      typeof window !== "undefined" &&
                      createPortal(
                        <div
                          ref={borderPopoverRef}
                          className="z-[9999] bg-white p-3 rounded shadow-lg border border-gray-300"
                          style={{
                            position: "fixed",
                            top: borderPos.top,
                            left: borderPos.left,
                          }}
                        >
                          <HexColorPicker
                            color={customSettings.borderColor || "#000000"}
                            onChange={(color) =>
                              onCustomSettingsChange({
                                ...customSettings,
                                borderColor: color,
                              })
                            }
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border transition-colors"
                              onClick={() => setShowBorderColorPicker(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>,
                        document.body
                      )}
                  </div>
                </div>
                {/* Background Color */}
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-medium text-gray-600 mb-1 block">
                    Background Color
                  </span>
                  <div className="relative" ref={backgroundColorRef}>
                    <button
                      ref={backgroundBtnRef}
                      className="w-20 sm:w-24 h-5 shadow-sm transition-all hover:border-gray-600 hover:cursor-pointer border border-black"
                      style={{
                        backgroundColor:
                          customSettings.backgroundColor || "white",
                        backgroundImage: "none",
                        backgroundSize: "8px 8px",
                        backgroundPosition: "0 0, 4px 4px",
                      }}
                      onClick={() => {
                        setShowBackgroundColorPicker((prev) => {
                          if (!prev) setShowBorderColorPicker(false);
                          return !prev;
                        });
                      }}
                    />
                    {showBackgroundColorPicker &&
                      typeof window !== "undefined" &&
                      createPortal(
                        <div
                          ref={backgroundPopoverRef}
                          className="z-[9999] bg-white p-3 rounded shadow-lg border border-gray-300"
                          style={{
                            position: "fixed",
                            top: backgroundPos.top,
                            left: backgroundPos.left,
                          }}
                        >
                          <HexColorPicker
                            color={customSettings.backgroundColor || "#ffffff"}
                            onChange={(color) =>
                              onCustomSettingsChange({
                                ...customSettings,
                                backgroundColor: color,
                              })
                            }
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border transition-colors"
                              onClick={() =>
                                setShowBackgroundColorPicker(false)
                              }
                            >
                              Close
                            </button>
                          </div>
                        </div>,
                        document.body
                      )}
                  </div>
                </div>
              </div>
              {/* Photo Rounded Corners */}
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-600 mb-1 block">
                  Photo Rounded Corners
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-2">
                  {[
                    { value: "none", label: "None" },
                    { value: "sm", label: "Small" },
                    { value: "md", label: "Medium" },
                    { value: "lg", label: "Large" },
                    { value: "xl", label: "Extra" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`px-1.5 py-1 text-xs font-medium border transition-all hover:cursor-pointer ${
                        customSettings.cornerRadius === option.value
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        onCustomSettingsChange({
                          ...customSettings,
                          cornerRadius: option.value,
                        })
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-32 h-10"></div>
            <div className="w-32 h-10"></div>
          </>
        )}
      </div>
    </div>
  );
}
