"use client";

import React, { useState } from "react";

const SettingsModal = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [selectedPhotos, setSelectedPhotos] = useState(
    currentSettings?.numberOfPhotos || 4
  );
  const [selectedTimer, setSelectedTimer] = useState(
    currentSettings?.timerDuration || 3
  );
  const [isClosing, setIsClosing] = useState(false);

  const photoOptions = [3, 4, 6];
  const timerOptions = [2, 3, 4, 5, 6, 10];

  const handleSave = () => {
    onSave({
      numberOfPhotos: selectedPhotos,
      timerDuration: selectedTimer,
    });
    handleClose();
  };

  const handlePhotoChange = (newPhotoCount) => {
    setSelectedPhotos(newPhotoCount);
    // Update settings immediately when photo count changes
    onSave({
      numberOfPhotos: newPhotoCount,
      timerDuration: selectedTimer,
    });
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match the animation duration
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className={`bg-white shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: isClosing
              ? "none"
              : "modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 text-left">
              Capture settings
            </h2>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Number of Photos */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 text-left">
                Number of Photos
              </label>
              <div className="flex gap-2">
                {photoOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handlePhotoChange(option)}
                    className={`flex-1 py-3 px-4 font-medium transition-all duration-200 cursor-pointer ${
                      selectedPhotos === option
                        ? "bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-102 border-2 border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {option} pics
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Duration */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 text-left">
                Timer duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timerOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedTimer(option)}
                    className={`py-3 px-4 font-medium transition-all duration-200 cursor-pointer ${
                      selectedTimer === option
                        ? "bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-102 border-2 border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {option}s
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-white text-gray-700 font-bold shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-200 cursor-pointer relative"
                style={{
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(to right, #f472b6, #60a5fa, #a78bfa) border-box",
                  border: "2px solid transparent",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default SettingsModal;
