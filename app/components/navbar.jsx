"use client";

import React from "react";

const Navbar = ({
  showPhotobooth,
  onSettingsOpen,
  onCapture,
  isCapturing,
  canRetake,
  onRetake,
  onPrint,
}) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-all duration-700 ${
        showPhotobooth ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: "400ms" }}
    >
      <div className="mini-navbar-animate flex bg-white/80 backdrop-blur-lg rounded-xl shadow-xl px-2 py-1 gap-1 border border-white/60 transition-all duration-200">
        {/* Settings */}
        <button
          className={`mini-nav-btn${
            isCapturing ? " mini-nav-btn-disabled" : ""
          }`}
          aria-label="Settings"
          type="button"
          onClick={isCapturing ? undefined : onSettingsOpen}
          disabled={isCapturing}
        >
          <span className="bg-gray-200 rounded-full flex items-center justify-center p-1.5">
            <img src="/images/setting.png" alt="Settings" className="w-5 h-5" />
          </span>
        </button>
        {/* Camera/Capture or Retake */}
        {canRetake ? (
          <button
            className="mini-nav-btn"
            aria-label="Retake"
            type="button"
            onClick={onRetake}
          >
            <span className="bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center p-1.5 shadow-md transition-colors duration-200">
              <img
                src="/images/repeat.png"
                alt="Retake"
                className="w-5 h-5"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </span>
          </button>
        ) : (
          <button
            className="mini-nav-btn"
            aria-label="Capture"
            type="button"
            onClick={() => {
              if (!isCapturing && typeof onCapture === "function") onCapture();
            }}
            disabled={isCapturing}
          >
            <span className="bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center p-1.5 shadow-md transition-colors duration-200">
              {isCapturing ? (
                <span className="mini-nav-spinner" />
              ) : (
                <img
                  src="/images/camera.png"
                  alt="Capture"
                  className="w-5 h-5"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
            </span>
          </button>
        )}
        {/* Print (enabled after photos taken) */}
        <button
          className={`mini-nav-btn${canRetake ? "" : " mini-nav-btn-disabled"}`}
          aria-label="Print"
          type="button"
          disabled={!canRetake}
          onClick={
            canRetake && typeof onPrint === "function" ? onPrint : undefined
          }
        >
          <span className="bg-gray-200 rounded-full flex items-center justify-center p-1.5">
            <img src="/images/printer.png" alt="Print" className="w-5 h-5" />
          </span>
        </button>
      </div>

      {/* Navbar styles */}
      <style jsx>{`
        .mini-nav-btn {
          background: transparent;
          border: none;
          outline: none;
          border-radius: 9999px;
          padding: 0.5rem 0.9rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: none;
          position: relative;
        }
        .mini-navbar-animate {
          transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mini-navbar-animate:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 32px 0 rgba(168, 139, 250, 0.18);
        }
        .mini-nav-btn:not(.mini-nav-btn-disabled):hover {
          background: rgba(168, 139, 250, 0.18);
          box-shadow: 0 4px 16px 0 rgba(168, 139, 250, 0.18);
          transform: scale(1.13) translateY(-1px);
        }
        .mini-nav-btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }
        .mini-nav-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2.5px solid #fff;
          border-top: 2.5px solid #a78bfa;
          border-radius: 50%;
          animation: mini-nav-spin 0.8s linear infinite;
        }
        @keyframes mini-nav-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
