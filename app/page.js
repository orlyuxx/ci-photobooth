import React from "react";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-200 overflow-hidden">
      {/* Decorative floating sparkles */}
      <div className="absolute top-10 left-10 animate-pulse text-yellow-400 text-3xl select-none pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-16 right-16 animate-bounce text-pink-400 text-2xl select-none pointer-events-none">
        ★
      </div>
      <div className="absolute top-1/2 left-1/4 animate-spin-slow text-blue-400 text-2xl select-none pointer-events-none">
        ✦
      </div>
      {/* Glassmorphic card */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-3xl border-2 border-white/70 max-w-md w-full">
        {/* Camera SVG icon */}
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
        {/* Main heading */}
        <h1 className="text-5xl font-bold text-black lilita-one text-center drop-shadow-lg">
          CI's Photobooth
        </h1>
        {/* Subtitle */}
        <h2 className="text-lg font-medium text-black text-center opacity-80">
          Pose and capture your best moments!
        </h2>
        {/* Start button */}
        <button className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white text-lg font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-pink-200 cursor-pointer">
          Take some photos
        </button>
      </div>
    </div>
  );
}
