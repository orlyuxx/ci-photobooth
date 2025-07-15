"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [step, setStep] = useState("welcome");
  const [showPhotobooth, setShowPhotobooth] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (step === "photobooth") {
      // Trigger entrance animation after photobooth layout is mounted
      setTimeout(() => setShowPhotobooth(true), 50);
    } else {
      setShowPhotobooth(false);
    }
  }, [step]);

  useEffect(() => {
    let stream;
    if (step === "photobooth") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          setCameraActive(true);
          setCameraStream(mediaStream);
        })
        .catch(() => {
          setCameraActive(false);
          setCameraStream(null);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraStream(null);
    };
  }, [step]);

  useEffect(() => {
    if (cameraActive && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraActive, cameraStream]);

  const handleStart = () => {
    setStep("loading");
    setTimeout(() => {
      setStep("photobooth");
    }, 1200);
  };

  const previewImages = [
    "/images/maloi.jpg",
    "/images/maloi.jpg",
    "/images/maloi.jpg",
    "/images/maloi.jpg",
  ];

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 ${
        step === "welcome"
          ? "flex items-center justify-center"
          : "flex flex-col items-center justify-start"
      } py-0 px-0 relative`}
    >
      {/* Decorative sparkles only on welcome and loading */}
      {step === "welcome" && (
        <>
          <div className="absolute top-10 left-10 animate-pulse text-yellow-400 text-3xl select-none pointer-events-none">
            ✨
          </div>
          <div className="absolute bottom-16 right-16 animate-bounce text-pink-400 text-2xl select-none pointer-events-none">
            ★
          </div>
          <div className="absolute top-1/2 left-1/4 animate-spin-slow text-blue-400 text-2xl select-none pointer-events-none">
            ✦
          </div>
          {/* Extra cute SVGs */}
          <div className="absolute top-24 right-24 animate-bounce text-purple-400 text-4xl select-none pointer-events-none">
            💖
          </div>
          <div className="absolute bottom-24 left-24 animate-pulse text-blue-300 text-3xl select-none pointer-events-none">
            🌟
          </div>
          <div className="absolute top-1/3 right-1/4 animate-spin-slow text-pink-300 text-2xl select-none pointer-events-none">
            ✨
          </div>
          <div className="absolute bottom-10 left-1/2 animate-bounce text-yellow-300 text-3xl select-none pointer-events-none">
            ⭐
          </div>
        </>
      )}
      {/* Welcome Card: always render unless in photobooth */}
      {step !== "photobooth" && (
        <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-3xl border-2 border-white/70 max-w-md w-full">
          <div className="bg-gradient-to-tr from-pink-300 via-blue-300 to-purple-300 p-3 rounded-full shadow-lg mb-2">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="16" fill="url(#paint0_linear)" />
              <path
                d="M34 18h-2.382l-1.447-2.894A2 2 0 0 0 28.382 14h-8.764a2 2 0 0 0-1.789 1.106L16.382 18H14a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V20a2 2 0 0 0-2-2zm-10 12a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                fill="#fff"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  y1="0"
                  x2="48"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#f472b6" />
                  <stop offset="0.5" stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-black lilita-one text-center drop-shadow-lg">
            CI's Photobooth
          </h1>
          <h2 className="text-md font-medium text-black text-center opacity-80">
            Pose and capture your best moments!
          </h2>
          {step === "welcome" && (
            <button
              className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white text-md font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-pink-200 cursor-pointer"
              onClick={handleStart}
            >
              Take some photos
            </button>
          )}
        </div>
      )}
      {/* Photobooth Layout */}
      {step === "photobooth" && (
        <>
          {/* Top: Title and Subtitle */}
          <div
            className={`w-full flex flex-col items-center mt-12 mb-8 transition-all duration-700 ${
              showPhotobooth
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl font-extrabold text-black lilita-one text-center drop-shadow-lg">
              CI's Photobooth
            </h1>
            <h2
              className="text-lg font-medium text-center text-purple-500 mt-2"
              style={{ letterSpacing: 0.2 }}
            >
              Pose and capture your best moments!
            </h2>
          </div>
          {/* Main: Two Columns */}
          <div className="flex flex-row w-full max-w-6xl mx-auto my-8 items-start justify-between px-12">
            {/* Left: Camera Preview */}
            <div
              className={`flex-1 mr-6 pr-4 flex-col items-start justify-center transition-all duration-700${
                showPhotobooth
                  ? " opacity-100 translate-y-0"
                  : " opacity-0 translate-y-8"
              }`}
            >
              <div
                className={`relative transition-all duration-700${
                  showPhotobooth
                    ? " opacity-100 translate-y-0"
                    : " opacity-0 translate-y-8"
                }`}
                style={{
                  width: 450,
                  height: 400,
                  transitionDelay: "200ms",
                }}
              >
                <div
                  className="w-full h-full bg-white shadow-2xl flex flex-col items-center justify-start border border-gray-200"
                  style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
                >
                  {/* Polaroid photo area - less top margin, more bottom margin */}
                  <div className="w-[90%] h-[80%] bg-gray-200 flex items-center justify-center mt-4 mb-6 overflow-hidden">
                    {cameraActive ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover rounded-t-md scale-x-[-1]"
                      />
                    ) : (
                      <span className="text-7xl text-gray-400">📷</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Preview Images */}
            <div
              className={`flex-1 flex flex-col items-end justify-center mt-2 transition-all duration-700 ${
                showPhotobooth
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              {/* <div className="w-full flex justify-center">
                <h3 className="text-lg text-center font-bold mb-6 text-black w-full">
                  Preview
                </h3>
              </div> */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 pt-6 pl-12">
                {previewImages.map((src, idx) => (
                  <div
                    key={idx}
                    className={
                      `relative w-56 h-40 bg-white flex items-center justify-center shadow-xl border-4 border-white photobooth-img-entrance ` +
                      (idx === 0 ? "-rotate-3 -translate-y-1" : "") +
                      (idx === 1 ? "rotate-2 translate-y-2" : "") +
                      (idx === 2 ? "rotate-1 -translate-y-1" : "") +
                      (idx === 3 ? "-rotate-2 translate-y-1" : "")
                    }
                    style={{
                      overflow: "hidden",
                      opacity: showPhotobooth ? 1 : 0,
                      transform: showPhotobooth
                        ? "translateY(0)"
                        : "translateY(32px)",
                      transition: `all 0.7s cubic-bezier(0.4,0,0.2,1)`,
                      transitionDelay: `${350 + idx * 120}ms`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      className="object-cover w-full h-full"
                      style={{ filter: "brightness(1.05) contrast(1.05)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mini Navbar at the bottom center */}
          <div
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-all duration-700 ${
              showPhotobooth
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="mini-navbar-animate flex bg-white/80 backdrop-blur-lg rounded-xl shadow-xl px-2 py-1 gap-1 border border-white/60 transition-all duration-200">
              {/* Settings */}
              <button
                className="mini-nav-btn"
                aria-label="Settings"
                type="button"
              >
                <span className="bg-gray-200 rounded-full flex items-center justify-center p-1.5">
                  <img
                    src="/images/setting.png"
                    alt="Settings"
                    className="w-5 h-5"
                  />
                </span>
              </button>
              {/* Camera/Capture */}
              <button
                className="mini-nav-btn"
                aria-label="Capture"
                type="button"
              >
                <span className="bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center p-1.5 shadow-md transition-colors duration-200">
                  <img
                    src="/images/camera.png"
                    alt="Capture"
                    className="w-5 h-5"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </span>
              </button>
              {/* Print (disabled) */}
              <button
                className="mini-nav-btn mini-nav-btn-disabled"
                aria-label="Print"
                type="button"
                disabled
              >
                <span className="bg-gray-200 rounded-full flex items-center justify-center p-1.5">
                  <img
                    src="/images/printer.png"
                    alt="Print"
                    className="w-5 h-5"
                  />
                </span>
              </button>
            </div>
          </div>
        </>
      )}
      {/* Full-screen loading overlay: always on top, never hides content */}
      {step === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 animate-fadein">
          <div className="absolute inset-0 bg-black/50" />
          {/* Four bouncing dots loader */}
          <div className="flex space-x-3 relative z-10">
            <span className="loader-dot"></span>
            <span className="loader-dot animation-delay-150"></span>
            <span className="loader-dot animation-delay-300"></span>
            <span className="loader-dot animation-delay-450"></span>
          </div>
        </div>
      )}
      {/* Fade-in animation for overlay and loader dot animation */}
      <style jsx global>{`
        .animate-fadein {
          animation: fadein 0.5s;
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .loader-dot {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          animation: loader-bounce 1s infinite ease-in-out;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-450 {
          animation-delay: 0.45s;
        }
        @keyframes loader-bounce {
          0%,
          80%,
          100% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.5);
          }
        }
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
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
      `}</style>
    </div>
  );
}
