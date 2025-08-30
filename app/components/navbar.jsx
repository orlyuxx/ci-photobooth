"use client";

import React from "react";

const Navbar = ({
  showPhotobooth,
  onSettingsOpen,
  showEditorAnim,
  onDownload,
  onCapture,
  isCapturing,
  canRetake,
  onRetake,
  onPrint,
  onEdit,
  isEditorStep,
}) => {
  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-all duration-700 px-4 ${
        showPhotobooth || showEditorAnim
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: "400ms" }}
    >
      <div className="mini-navbar-animate flex bg-white/80 backdrop-blur-lg rounded-lg sm:rounded-xl shadow-xl px-1.5 sm:px-2 py-1 gap-0.5 sm:gap-1 border border-white/60 transition-all duration-200 max-w-[90vw] overflow-hidden">
        {/* Settings / Download (in editor) */}
        <button
          className={`mini-nav-btn${
            isCapturing ? " mini-nav-btn-disabled" : ""
          }`}
          aria-label={isEditorStep ? "Download" : "Settings"}
          type="button"
          onClick={
            isCapturing ? undefined : isEditorStep ? onDownload : onSettingsOpen
          }
          disabled={isCapturing}
        >
          <span className="bg-gray-200 rounded-full flex items-center justify-center p-1 sm:p-1.5">
            <img
              src={
                isEditorStep ? "/images/download.png" : "/images/setting.png"
              }
              alt={isEditorStep ? "Download" : "Settings"}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
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
            <span className="bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center p-1 sm:p-1.5 shadow-md transition-colors duration-200">
              <img
                src="/images/repeat.png"
                alt="Retake"
                className="w-4 h-4 sm:w-5 sm:h-5"
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
            <span className="bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center p-1 sm:p-1.5 shadow-md transition-colors duration-200">
              {isCapturing ? (
                <span className="mini-nav-spinner" />
              ) : (
                <img
                  src="/images/camera.png"
                  alt="Capture"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
            </span>
          </button>
        )}

        {/* Print/Edit (enabled after photos taken) */}
        <button
          className={`mini-nav-btn${canRetake ? "" : " mini-nav-btn-disabled"}`}
          aria-label={isEditorStep ? "Print" : "Edit"}
          type="button"
          disabled={!canRetake}
          onClick={
            canRetake
              ? isEditorStep
                ? typeof onPrint === "function"
                  ? onPrint
                  : undefined
                : typeof onEdit === "function"
                ? onEdit
                : undefined
              : undefined
          }
        >
          <span className="bg-gray-200 rounded-full flex items-center justify-center p-1 sm:p-1.5">
            <img
              src={isEditorStep ? "/images/printer.png" : "/images/edit.png"}
              alt={isEditorStep ? "Print" : "Edit"}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
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
          padding: 0.25rem 0.5rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: none;
          position: relative;
          min-width: 44px; /* Apple's recommended touch target size */
          min-height: 44px; /* Apple's recommended touch target size */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive adjustments for different screen sizes */
        @media (min-width: 640px) {
          .mini-nav-btn {
            padding: 0.5rem 0.9rem;
            min-width: 48px;
            min-height: 48px;
          }
        }

        @media (min-width: 768px) {
          .mini-nav-btn {
            min-width: 52px;
            min-height: 52px;
          }
        }

        .mini-navbar-animate {
          transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hover effects - only on larger screens to avoid sticky hover on mobile */
        @media (min-width: 768px) {
          .mini-navbar-animate:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 32px 0 rgba(168, 139, 250, 0.18);
          }

          .mini-nav-btn:not(.mini-nav-btn-disabled):hover {
            background: rgba(168, 139, 250, 0.18);
            box-shadow: 0 4px 16px 0 rgba(168, 139, 250, 0.18);
            transform: scale(1.1) translateY(-1px);
          }
        }

        /* Touch-friendly interactions for mobile */
        @media (max-width: 767px) {
          .mini-nav-btn:not(.mini-nav-btn-disabled):active {
            background: rgba(168, 139, 250, 0.15);
            transform: scale(0.95);
          }

          .mini-navbar-animate:active {
            transform: scale(1.02);
          }
        }

        .mini-nav-btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .mini-nav-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #fff;
          border-top: 2px solid #a78bfa;
          border-radius: 50%;
          animation: mini-nav-spin 0.8s linear infinite;
        }

        /* Responsive spinner size */
        @media (min-width: 640px) {
          .mini-nav-spinner {
            width: 20px;
            height: 20px;
            border-width: 2.5px;
            border-top-width: 2.5px;
          }
        }

        @keyframes mini-nav-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Ensure navbar doesn't get cut off on very small screens */
        @media (max-width: 480px) {
          .mini-navbar-animate {
            max-width: calc(100vw - 2rem);
            padding: 0.25rem 1rem;
            gap: 0.25rem;
          }

          .mini-nav-btn {
            padding: 0.25rem 0.4rem;
            min-width: 40px;
            min-height: 40px;
          }
        }

        /* Better touch targets on very small screens */
        @media (max-width: 380px) {
          .mini-navbar-animate {
            padding: 0.5rem 0.75rem;
          }

          .mini-nav-btn {
            min-width: 38px;
            min-height: 38px;
          }
        }

        /* Prevent accidental zoom on double-tap for iOS */
        .mini-nav-btn {
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
