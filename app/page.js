"use client";

import React, { useState, useEffect, useRef } from "react";
import SettingsModal from "./components/settings";
import Navbar from "./components/navbar";
import Frames from "./components/frames";
import Filters from "./components/filters";
import Stickers from "./components/stickers";

// SparkleBurst effect
function SparkleBurst({ duration = 1200 }) {
  return (
    <span className="effect-sparkle-burst">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className={`sparkle sparkle-${i}`} />
      ))}
      <style jsx>{`
        .effect-sparkle-burst {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .sparkle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: gold;
          border-radius: 50%;
          opacity: 0.8;
          animation: sparkle-burst ${duration}ms linear forwards;
        }
        .sparkle-0 {
          transform: rotate(0deg) translateY(-20px);
        }
        .sparkle-1 {
          transform: rotate(45deg) translateY(-20px);
        }
        .sparkle-2 {
          transform: rotate(90deg) translateY(-20px);
        }
        .sparkle-3 {
          transform: rotate(135deg) translateY(-20px);
        }
        .sparkle-4 {
          transform: rotate(180deg) translateY(-20px);
        }
        .sparkle-5 {
          transform: rotate(225deg) translateY(-20px);
        }
        .sparkle-6 {
          transform: rotate(270deg) translateY(-20px);
        }
        .sparkle-7 {
          transform: rotate(315deg) translateY(-20px);
        }
        @keyframes sparkle-burst {
          0% {
            opacity: 1;
            transform: scale(0.5) translateY(0);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.2) translateY(-40px);
          }
        }
      `}</style>
    </span>
  );
}

// Colorful Spark Burst effect for heart
function ColorSparkBurst({ duration = 1300 }) {
  const colors = [
    "#f472b6",
    "#60a5fa",
    "#a78bfa",
    "#fbbf24",
    "#34d399",
    "#f87171",
    "#facc15",
    "#38bdf8",
    "#a3e635",
    "#f472b6",
  ];
  return (
    <span className="effect-sparkle-burst">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className={`sparkle sparkle-${i}`}
          style={{ background: colors[i % colors.length] }}
        />
      ))}
      <style jsx>{`
        .effect-sparkle-burst {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .sparkle {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          opacity: 0.85;
          animation: color-sparkle-burst ${duration}ms linear forwards;
        }
        .sparkle-0 {
          transform: rotate(0deg) translateY(-24px);
        }
        .sparkle-1 {
          transform: rotate(30deg) translateY(-24px);
        }
        .sparkle-2 {
          transform: rotate(60deg) translateY(-24px);
        }
        .sparkle-3 {
          transform: rotate(90deg) translateY(-24px);
        }
        .sparkle-4 {
          transform: rotate(120deg) translateY(-24px);
        }
        .sparkle-5 {
          transform: rotate(150deg) translateY(-24px);
        }
        .sparkle-6 {
          transform: rotate(180deg) translateY(-24px);
        }
        .sparkle-7 {
          transform: rotate(210deg) translateY(-24px);
        }
        .sparkle-8 {
          transform: rotate(240deg) translateY(-24px);
        }
        .sparkle-9 {
          transform: rotate(270deg) translateY(-24px);
        }
        .sparkle-10 {
          transform: rotate(300deg) translateY(-24px);
        }
        .sparkle-11 {
          transform: rotate(330deg) translateY(-24px);
        }
        @keyframes color-sparkle-burst {
          0% {
            opacity: 1;
            transform: scale(0.5) translateY(0);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.3) translateY(-48px);
          }
        }
      `}</style>
    </span>
  );
}

// Confetti effect with random colors for each confetti piece
function ConfettiBurst({ duration = 1500 }) {
  // Generate random colors for each confetti piece on each render
  const palette = [
    "#f472b6",
    "#60a5fa",
    "#a78bfa",
    "#fbbf24",
    "#34d399",
    "#f87171",
    "#facc15",
    "#38bdf8",
    "#a3e635",
    "#f472b6",
  ];
  const confettiColors = Array.from({ length: 10 }).map(
    () => palette[Math.floor(Math.random() * palette.length)]
  );
  return (
    <span className="effect-confetti-burst">
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`confetti confetti-${i}`}
          style={{ background: confettiColors[i] }}
        />
      ))}
      <style jsx>{`
        .effect-confetti-burst {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .confetti {
          position: absolute;
          width: 8px;
          height: 14px;
          border-radius: 2px;
          opacity: 0.8;
          animation: confetti-burst ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }
        .confetti-0 {
          transform: rotate(0deg) translateY(-10px);
        }
        .confetti-1 {
          transform: rotate(36deg) translateY(-10px);
        }
        .confetti-2 {
          transform: rotate(72deg) translateY(-10px);
        }
        .confetti-3 {
          transform: rotate(108deg) translateY(-10px);
        }
        .confetti-4 {
          transform: rotate(144deg) translateY(-10px);
        }
        .confetti-5 {
          transform: rotate(180deg) translateY(-10px);
        }
        .confetti-6 {
          transform: rotate(216deg) translateY(-10px);
        }
        .confetti-7 {
          transform: rotate(252deg) translateY(-10px);
        }
        .confetti-8 {
          transform: rotate(288deg) translateY(-10px);
        }
        .confetti-9 {
          transform: rotate(324deg) translateY(-10px);
        }
        @keyframes confetti-burst {
          0% {
            opacity: 1;
            transform: scale(0.7) translateY(0);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.1) translateY(-60px);
          }
        }
      `}</style>
    </span>
  );
}

// Pulse effect
function PulseEffect({ duration = 1200 }) {
  return (
    <span className="effect-pulse">
      <span className="pulse-circle" />
      <style jsx>{`
        .effect-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .pulse-circle {
          position: absolute;
          width: 40px;
          height: 40px;
          left: -20px;
          top: -20px;
          border-radius: 50%;
          background: rgba(236, 72, 153, 0.3);
          animation: pulse-grow ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }
        @keyframes pulse-grow {
          0% {
            opacity: 0.7;
            transform: scale(0.5);
          }
          80% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: scale(2.2);
          }
        }
      `}</style>
    </span>
  );
}

// StarTwinkle effect
function StarTwinkle({ duration = 1200 }) {
  return (
    <span className="effect-star-twinkle">
      <span className="twinkle-star" />
      <style jsx>{`
        .effect-star-twinkle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .twinkle-star {
          position: absolute;
          width: 24px;
          height: 24px;
          left: -12px;
          top: -12px;
          background: url('data:image/svg+xml;utf8,<svg width="24" height="24" fill="gold" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10"/></svg>')
            no-repeat center/contain;
          opacity: 0.8;
          animation: twinkle ${duration}ms linear forwards;
        }
        @keyframes twinkle {
          0% {
            opacity: 0.8;
            transform: scale(0.7) rotate(0deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.2) rotate(20deg);
          }
          100% {
            opacity: 0;
            transform: scale(1.5) rotate(-20deg);
          }
        }
      `}</style>
    </span>
  );
}

// HeartPop effect
function HeartPop({ duration = 1500 }) {
  return (
    <span className="effect-heart-pop">
      <span className="pop-heart" />
      <style jsx>{`
        .effect-heart-pop {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .pop-heart {
          position: absolute;
          width: 28px;
          height: 28px;
          left: -14px;
          top: -14px;
          background: url('data:image/svg+xml;utf8,<svg width="28" height="28" fill="%23ec4899" xmlns="http://www.w3.org/2000/svg"><path d="M14 25s-7.5-6.2-10.5-10.2C1.1 12.1 2.4 8.5 6 8.5c1.7 0 3.4 1.1 4.3 2.7C11.6 9.6 13.3 8.5 15 8.5c3.6 0 4.9 3.6 2.5 6.3C21.5 18.8 14 25 14 25z"/></svg>')
            no-repeat center/contain;
          opacity: 0.8;
          animation: heart-pop ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }
        @keyframes heart-pop {
          0% {
            opacity: 0.8;
            transform: scale(0.7);
          }
          60% {
            opacity: 1;
            transform: scale(1.3);
          }
          100% {
            opacity: 0;
            transform: scale(2.1);
          }
        }
      `}</style>
    </span>
  );
}

// HeartPopUp effect: a heart SVG pops up, scales, bounces, and fades BESIDE the draggable heart
function HeartPopUp({ duration = 1200 }) {
  return (
    <span className="effect-heart-popup">
      <span className="popup-heart" />
      <style jsx>{`
        .effect-heart-popup {
          position: absolute;
          left: 40px; /* Offset to the right of the draggable heart */
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .popup-heart {
          position: absolute;
          width: 40px;
          height: 40px;
          left: -20px;
          top: -20px;
          background: url('data:image/svg+xml;utf8,<svg width="40" height="40" fill="%23ec4899" xmlns="http://www.w3.org/2000/svg"><path d="M20 36s-10.5-8.7-14.7-14.3C2.1 16.1 3.6 11 9 11c2.4 0 4.7 1.6 6 4 1.3-2.4 3.6-4 6-4 5.4 0 6.9 5.1 3.7 10.7C30.5 27.3 20 36 20 36z"/></svg>')
            no-repeat center/contain;
          opacity: 0.9;
          animation: heart-popup-anim ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }
        @keyframes heart-popup-anim {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(10px);
          }
          40% {
            opacity: 1;
            transform: scale(1.2) translateY(-8px);
          }
          60% {
            opacity: 1;
            transform: scale(0.95) translateY(0px);
          }
          80% {
            opacity: 0.9;
            transform: scale(1.05) translateY(-4px);
          }
          100% {
            opacity: 0;
            transform: scale(1.2) translateY(-16px);
          }
        }
      `}</style>
    </span>
  );
}

// StarShineTwinkle effect: a star SVG overlays, glows/twinkles, and fades
function StarShineTwinkle({ duration = 1200 }) {
  return (
    <span className="effect-star-shine">
      <span className="shine-star" />
      <span className="shine-glow" />
      <style jsx>{`
        .effect-star-shine {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .shine-star {
          position: absolute;
          width: 32px;
          height: 32px;
          left: -16px;
          top: -16px;
          background: url('data:image/svg+xml;utf8,<svg width="32" height="32" fill="gold" xmlns="http://www.w3.org/2000/svg"><polygon points="16,2 20,12 30,12 22,18 24,30 16,23 8,30 10,18 2,12 12,12"/></svg>')
            no-repeat center/contain;
          opacity: 0.85;
          animation: star-shine-twinkle ${duration}ms
            cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .shine-glow {
          position: absolute;
          width: 60px;
          height: 60px;
          left: -30px;
          top: -30px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 235, 59, 0.5) 0%,
            rgba(255, 235, 59, 0.15) 60%,
            transparent 100%
          );
          opacity: 0.7;
          animation: star-glow-anim ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }
        @keyframes star-shine-twinkle {
          0% {
            opacity: 0;
            transform: scale(0.7) rotate(0deg);
          }
          30% {
            opacity: 1;
            transform: scale(1.2) rotate(10deg);
          }
          60% {
            opacity: 1;
            transform: scale(0.95) rotate(-8deg);
          }
          80% {
            opacity: 0.9;
            transform: scale(1.05) rotate(6deg);
          }
          100% {
            opacity: 0;
            transform: scale(1.2) rotate(-12deg);
          }
        }
        @keyframes star-glow-anim {
          0% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          40% {
            opacity: 0.7;
            transform: scale(1.1);
          }
          80% {
            opacity: 0.5;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.3);
          }
        }
      `}</style>
    </span>
  );
}

// DraggableSVG: makes children draggable and adds a click effect
function DraggableSVG({ children, initial, className = "", onClickEffect }) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [effect, setEffect] = useState(false);
  // Instead of showEffect, use an array of active effects
  const [activeEffects, setActiveEffects] = useState([]);
  const [trail, setTrail] = useState([]); // Trail state
  const nodeRef = useRef(null);
  const effectDuration = 1300; // ms, used for all effects
  let effectId = useRef(0);
  const TRAIL_LENGTH = 12; // Number of trail points

  // Mouse events
  const onMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
    setTrail([]); // Clear trail on new drag
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const newPos = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    setPos(newPos);
    setTrail((prev) => {
      const next = [...prev, newPos];
      return next.length > TRAIL_LENGTH ? next.slice(-TRAIL_LENGTH) : next;
    });
  };
  const onMouseUp = () => {
    setDragging(false);
    setTrail([]); // Clear trail when done
  };

  // Touch events
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    setDragging(true);
    setOffset({
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y,
    });
    setTrail([]); // Clear trail on new drag
    e.stopPropagation();
  };
  const onTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const newPos = { x: touch.clientX - offset.x, y: touch.clientY - offset.y };
    setPos(newPos);
    setTrail((prev) => {
      const next = [...prev, newPos];
      return next.length > TRAIL_LENGTH ? next.slice(-TRAIL_LENGTH) : next;
    });
  };
  const onTouchEnd = () => {
    setDragging(false);
    setTrail([]); // Clear trail when done
  };

  // Add/remove listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line
  }, [dragging, offset]);

  // Click effect
  const handleClick = (e) => {
    setEffect(true);
    // Add a new effect instance with a unique id
    const id = effectId.current++;
    setActiveEffects((prev) => [...prev, id]);
    setTimeout(() => setEffect(false), 400);
    setTimeout(() => {
      setActiveEffects((prev) => prev.filter((eid) => eid !== id));
    }, effectDuration);
    if (typeof children.props.onClick === "function") {
      children.props.onClick(e);
    }
  };

  return (
    <>
      {/* Trail effect: render faded SVGs at previous positions while dragging */}
      {dragging &&
        trail.length > 1 &&
        trail.map((t, i) => {
          // Fade older points more
          const opacity = ((i + 1) / trail.length) * 0.5; // max 0.5 opacity
          return (
            <div
              key={i}
              className={
                `draggable-svg-trail absolute select-none pointer-events-none ` +
                className
              }
              style={{
                left: t.x,
                top: t.y,
                zIndex: 999,
                opacity,
                filter: "blur(1.5px)",
                transition: "none",
              }}
            >
              {children}
            </div>
          );
        })}
      <div
        ref={nodeRef}
        className={
          `draggable-svg absolute select-none pointer-events-auto cursor-grab ` +
          (dragging ? "dragging " : "") +
          (effect ? "svg-click-effect " : "") +
          className
        }
        style={{ left: pos.x, top: pos.y, zIndex: 1000 }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={handleClick}
      >
        {children}
        {activeEffects.map((id) => (
          <span
            key={id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {onClickEffect && onClickEffect({ duration: effectDuration })}
          </span>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const [step, setStep] = useState("welcome");
  const [showPhotobooth, setShowPhotobooth] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState({
    numberOfPhotos: 4,
    timerDuration: 3,
  });
  const videoRef = useRef(null);

  // Add states for capturing
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null); // null or number
  const [capturedImages, setCapturedImages] = useState([]);
  const [showCaptureEffect, setShowCaptureEffect] = useState(false);
  const [animatedPreviews, setAnimatedPreviews] = useState([]); // track which previews have animated

  // Add mounted state to prevent FOUC
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Store initial positions for draggable SVGs
  const [svgPositions, setSvgPositions] = useState(null);
  // For entrance animation
  const [showOnMount, setShowOnMount] = useState(false);
  // For Tailwind card animation
  const [showCard, setShowCard] = useState(false);
  // SVG staggered entrance state
  const [visibleSVGs, setVisibleSVGs] = useState(0); // how many SVGs are visible

  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      setSvgPositions([
        { x: 40, y: 40 },
        { x: window.innerWidth - 120, y: window.innerHeight - 160 },
        { x: window.innerWidth * 0.25, y: window.innerHeight * 0.5 },
        { x: window.innerWidth - 160, y: 96 },
        { x: 96, y: window.innerHeight - 200 },
        { x: window.innerWidth * 0.75, y: window.innerHeight * 0.33 },
        { x: window.innerWidth * 0.5 - 28, y: window.innerHeight - 80 }, // perfectly center the yellow star
      ]);
    }
    // Trigger entrance animation after mount
    setTimeout(() => setShowCard(true), 80);
  }, []);

  // Stagger SVGs after card animates in
  useEffect(() => {
    if (showCard && step === "welcome") {
      // Wait for card animation (400ms), then start showing SVGs one by one
      const baseDelay = 400;
      const svgCount = 7;
      const stagger = 200; // ms between SVGs
      setShowOnMount(false); // reset
      setVisibleSVGs(0);
      let timeouts = [];
      for (let i = 0; i < svgCount; i++) {
        timeouts.push(
          setTimeout(() => {
            setVisibleSVGs((prev) => Math.max(prev, i + 1));
          }, baseDelay + i * stagger)
        );
      }
      // Set showOnMount true after first SVG for animation class
      setTimeout(() => setShowOnMount(true), baseDelay);
      return () => timeouts.forEach(clearTimeout);
    }
  }, [showCard, step]);

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
    setStep("photobooth");
  };

  const handleSettingsOpen = () => {
    setShowSettingsModal(true);
  };

  const handleSettingsClose = () => {
    setShowSettingsModal(false);
  };

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
  };

  const previewImages = [
    "/images/maloi.jpg",
    "/images/maloi.jpg",
    "/images/maloi.jpg",
    "/images/maloi.jpg",
    "/images/maloi.jpg",
    "/images/maloi.jpg",
  ];

  // Get the correct number of preview images based on settings
  const displayImages =
    capturedImages.length > 0
      ? capturedImages.slice(0, settings.numberOfPhotos)
      : previewImages.slice(0, settings.numberOfPhotos);

  // Calculate grid layout based on number of photos
  const getGridLayout = (count) => {
    switch (count) {
      case 3:
        return "grid-cols-2 gap-x-8 gap-y-8";
      case 4:
        return "grid-cols-2 gap-x-8 gap-y-8";
      case 6:
        return "grid-cols-2 gap-x-6 gap-y-6";
      default:
        return "grid-cols-2 gap-x-8 gap-y-8";
    }
  };

  // Get positioning classes based on index and total count
  const getPositionClasses = (index, total) => {
    if (total === 3) {
      switch (index) {
        case 0:
          return "-rotate-3 -translate-y-1";
        case 1:
          return "rotate-2 translate-y-2";
        case 2:
          return "rotate-1 -translate-y-1 col-span-2 mx-auto";
        default:
          return "";
      }
    } else if (total === 4) {
      switch (index) {
        case 0:
          return "-rotate-3 -translate-y-1";
        case 1:
          return "rotate-2 translate-y-2";
        case 2:
          return "rotate-1 -translate-y-1";
        case 3:
          return "-rotate-2 translate-y-1";
        default:
          return "";
      }
    } else if (total === 6) {
      switch (index) {
        case 0:
          return "-rotate-2 -translate-y-1";
        case 1:
          return "rotate-1 translate-y-1";
        case 2:
          return "-rotate-1 translate-y-2";
        case 3:
          return "rotate-2 -translate-y-1";
        case 4:
          return "-rotate-1 translate-y-1";
        case 5:
          return "rotate-1 -translate-y-2";
        default:
          return "";
      }
    }
    return "";
  };

  // Capture logic
  const handleCapture = async () => {
    if (!cameraActive || !videoRef.current) return;
    setIsCapturing(true);
    setCapturedImages([]);
    setAnimatedPreviews([]);
    const images = [];
    for (let i = 0; i < settings.numberOfPhotos; i++) {
      // Countdown
      for (let t = settings.timerDuration; t > 0; t--) {
        setCountdown(t);
        await new Promise((res) => setTimeout(res, 1000));
      }
      setCountdown(null);
      // Capture frame
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      // Mirror horizontally to match preview
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      images.push(dataUrl);
      setCapturedImages((prev) => [...prev, dataUrl]);
      setShowCaptureEffect(true);
      setTimeout(() => setShowCaptureEffect(false), 250); // flash duration
      setTimeout(() => {
        setAnimatedPreviews((prev) => [...prev, i]);
      }, 100); // trigger preview animation after capture
      // Small pause between shots (optional)
      if (i < settings.numberOfPhotos - 1) {
        await new Promise((res) => setTimeout(res, 500));
      }
    }
    setIsCapturing(false);
  };

  // Animate in new preview images elegantly
  useEffect(() => {
    if (capturedImages.length > 0) {
      // Only animate in the newly added image
      const lastIdx = capturedImages.length - 1;
      const key = capturedImages[lastIdx] + "-" + lastIdx;
      if (!animatedPreviews.includes(key)) {
        setTimeout(() => {
          setAnimatedPreviews((prev) => [...prev, key]);
        }, 80); // slight delay for entrance effect
      }
    }
  }, [capturedImages]);

  // Retake logic
  const canRetake =
    capturedImages.length === settings.numberOfPhotos && !isCapturing;
  const handleRetake = () => {
    setCapturedImages([]);
    setAnimatedPreviews([]);
    setPlacedStickers([]);
  };
  const handlePrint = () => {
    if (canRetake) {
      setStep("editor");
    }
  };

  const [selectedFrame, setSelectedFrame] = useState("classic");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [placedStickers, setPlacedStickers] = useState([]);
  const [customFrameSettings, setCustomFrameSettings] = useState({
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    cornerRadius: "none",
  });

  // Function to get CSS filter based on selected filter
  const getFilterStyle = (filterType) => {
    switch (filterType) {
      case "grayscale":
        return { filter: "grayscale(100%)" };
      case "brightness":
        return { filter: "brightness(1.3) contrast(1.1)" };
      case "contrast":
        return { filter: "contrast(1.5) brightness(1.1)" };
      case "sepia":
        return { filter: "sepia(80%)" };
      case "vintage":
        return {
          filter: "sepia(40%) brightness(1.1) contrast(1.2) saturate(1.3)",
        };
      case "none":
      default:
        return {};
    }
  };

  // Function to get frame styles based on selected frame and custom settings
  const getFrameStyle = (frameType, customSettings = {}) => {
    switch (frameType) {
      case "classic":
        return {
          background: "#fff",
          border: "none",
          borderRadius: 0,
        };
      case "film":
        return {
          background: "#111",
          border: "none",
          borderRadius: 0,
        };
      case "modern":
        return {
          background: "#fff",
          border: "2px solid #000",
          borderRadius: 4, // smaller radius for the strip
        };
      case "custom":
        // For the custom frame, the strip container should have no border radius
        return {
          background: customSettings.backgroundColor || "white",
          border: `2px solid ${customSettings.borderColor || "black"}`,
          borderRadius: 0,
        };
      default:
        return {
          background: "#fff",
          border: "none",
          borderRadius: 0,
        };
    }
  };

  // Function to handle sticker placement
  const handleStickerPlacement = (photoIndex, event) => {
    if (!selectedSticker) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newSticker = {
      id: Date.now() + Math.random(),
      stickerId: selectedSticker,
      photoIndex: photoIndex,
      x: x,
      y: y,
    };

    setPlacedStickers((prev) => [...prev, newSticker]);
    setSelectedSticker(null); // Clear selection after placement
  };

  // Function to remove sticker
  const removeSticker = (stickerId) => {
    setPlacedStickers((prev) =>
      prev.filter((sticker) => sticker.id !== stickerId)
    );
  };

  // Function to undo last placed sticker
  const handleUndo = () => {
    setPlacedStickers((prev) => {
      if (prev.length > 0) {
        return prev.slice(0, -1); // Remove the last placed sticker
      }
      return prev;
    });
  };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 ${
        step === "welcome"
          ? "flex items-center justify-center"
          : "flex flex-col items-center justify-start"
      } py-0 px-0 relative`}
    >
      {/* Decorative sparkles only on welcome and loading */}
      {step === "welcome" && svgPositions && (
        <>
          {visibleSVGs > 0 && (
            <DraggableSVG
              initial={svgPositions[0]}
              className={`animate-pulse text-yellow-400 text-3xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `0ms` }}
            >
              <span>✨</span>
            </DraggableSVG>
          )}
          {visibleSVGs > 1 && (
            <DraggableSVG
              initial={svgPositions[1]}
              className={`animate-bounce text-pink-400 text-2xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `200ms` }}
            >
              <span>★</span>
            </DraggableSVG>
          )}
          {visibleSVGs > 2 && (
            <DraggableSVG
              initial={svgPositions[2]}
              className={`animate-twinkle text-blue-400 text-2xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `400ms` }}
            >
              <span>✦</span>
            </DraggableSVG>
          )}
          {visibleSVGs > 3 && (
            <DraggableSVG
              initial={svgPositions[3]}
              className={`animate-bounce text-purple-400 text-4xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `600ms` }}
            >
              <span>💖</span>
            </DraggableSVG>
          )}
          {visibleSVGs > 4 && (
            <DraggableSVG
              initial={svgPositions[4]}
              className={`animate-pulse text-blue-300 text-3xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `800ms` }}
            >
              <span>🌟</span>
            </DraggableSVG>
          )}
          {visibleSVGs > 5 && (
            <DraggableSVG
              initial={svgPositions[5]}
              className={`animate-pulse text-pink-300 text-2xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `1000ms` }}
            >
              <span>✨</span>
            </DraggableSVG>
          )}
          {visibleSVGs > 6 && (
            <DraggableSVG
              initial={svgPositions[6]}
              className={`animate-star-shine text-yellow-300 text-3xl svg-entrance${
                showOnMount ? " svg-entrance-in" : ""
              }`}
              style={{ transitionDelay: `1200ms` }}
            >
              <span>⭐</span>
            </DraggableSVG>
          )}
        </>
      )}
      {/* Welcome Card: always render unless in photobooth */}
      {mounted && step !== "photobooth" && step !== "editor" && (
        <div className="flex flex-col items-center justify-center gap-4 mt-16 mb-8 w-full max-w-md mx-auto">
          <div className="flex flex-row items-center gap-4 group">
            <img
              src="/images/photobooth-logo.png"
              alt="Photobooth Logo"
              width={65}
              height={65}
              className={
                `rounded-xl shadow-md object-contain bg-white transition-all duration-400 ease-out transform ` +
                ` group-hover:scale-105 ` +
                (showCard
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8")
              }
            />
            <h1
              className={
                `text-8xl font-bold text-black lilita-one text-center drop-shadow-lg whitespace-nowrap transition-all duration-400 ease-out transform ` +
                ` group-hover:scale-105 ` +
                (showCard
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8")
              }
            >
              Snappy
            </h1>
          </div>
          <h2
            className={
              `text-xl font-medium text-purple-500 text-center transition-all duration-400 ease-out transform ` +
              (showCard
                ? "opacity-100 translate-y-0 opacity-80"
                : "opacity-0 translate-y-8")
            }
          >
            Pose and capture your cute moments!
          </h2>
          {step === "welcome" && (
            <button
              className={
                `mt-12 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white text-md font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-pink-200 cursor-pointer transition-all duration-400 ease-out transform ` +
                (showCard
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-8")
              }
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
            <div className="flex flex-row items-center gap-4 group">
              <img
                src="/images/photobooth-logo.png"
                alt="Photobooth Logo"
                width={50}
                height={50}
                className="rounded-xl shadow-md object-contain bg-white"
              />
              <h1 className="text-5xl font-extrabold text-black lilita-one text-center drop-shadow-lg">
                Snappy
              </h1>
            </div>
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
              className={`-mt-8 flex-1 mr-6 pr-4 flex-col items-start justify-center transition-all duration-700${
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
                  width: 500,
                  height: 450,
                  transitionDelay: "200ms",
                }}
              >
                <div
                  className="w-full h-full bg-white shadow-2xl flex flex-col items-center justify-start border border-gray-200"
                  style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
                >
                  {/* Polaroid photo area - less top margin, more bottom margin */}
                  <div
                    className="w-[90%] h-[85%] bg-gray-200 flex items-center justify-center mt-4 mb-6 overflow-hidden"
                    style={{ position: "relative" }}
                  >
                    {cameraActive ? (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover scale-x-[-1]"
                        />
                        {countdown !== null && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                            <span className="text-white text-5xl font-bold drop-shadow-lg animate-pulse">
                              {countdown}
                            </span>
                          </div>
                        )}
                        {showCaptureEffect && (
                          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                            <ConfettiBurst duration={700} />
                            <div className="absolute inset-0 bg-white opacity-40 animate-capture-flash" />
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-7xl text-gray-400">📷</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Preview Images */}
            <div
              className={`-mt-2 flex-1 flex flex-col items-end justify-center transition-all duration-700 ${
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
              <div
                className={`grid ${getGridLayout(settings.numberOfPhotos)} ${
                  settings.numberOfPhotos === 6 ? "-mt-6" : "pt-6"
                } pl-12`}
              >
                {displayImages.map((src, idx) => {
                  const key = src + "-" + idx;
                  return (
                    <div
                      key={key}
                      className={
                        `relative bg-white flex items-center justify-center shadow-xl border-4 border-white ${
                          settings.numberOfPhotos === 6
                            ? "w-48 h-36"
                            : "w-56 h-40"
                        } ` +
                        getPositionClasses(idx, settings.numberOfPhotos) +
                        (animatedPreviews.includes(key)
                          ? " preview-elegant-in"
                          : "")
                      }
                      style={{
                        overflow: "hidden",
                        opacity: 1,
                        transform: "translateY(0)",
                        transition: "none",
                        animationDelay: animatedPreviews.includes(key)
                          ? `${idx * 0.12}s`
                          : undefined,
                      }}
                    >
                      <img
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="object-cover w-full h-full"
                        style={{ filter: "brightness(1.05) contrast(1.05)" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Mini Navbar */}
          <Navbar
            showPhotobooth={showPhotobooth}
            onSettingsOpen={handleSettingsOpen}
            onCapture={handleCapture}
            isCapturing={isCapturing}
            canRetake={canRetake}
            onRetake={handleRetake}
            onPrint={handlePrint}
          />
        </>
      )}
      {/* Editor Step: Photo Strip Editor */}
      {step === "editor" && (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center mt-12 mb-8 transition-all duration-700">
          {/* Logo and Title */}
          <div className="flex flex-row items-center gap-4 mb-4">
            <img
              src="/images/photobooth-logo.png"
              alt="Photobooth Logo"
              width={50}
              height={50}
              className="rounded-xl shadow-md object-contain bg-white"
            />
            <h1 className="text-5xl font-extrabold text-black lilita-one text-center drop-shadow-lg">
              Snappy
            </h1>
          </div>
          {/* Main Editor Layout */}
          <div className="flex flex-row w-full items-start justify-end px-12 mt-8">
            {/* Left: Photo Strip */}
            <div
              className="flex flex-col items-center justify-center mr-60"
              style={{ minWidth: 320 }}
            >
              <div
                className={`shadow-2xl flex flex-col items-center justify-center py-6 px-4 relative`}
                style={{
                  minHeight: 560,
                  minWidth: 100,
                  ...getFrameStyle(selectedFrame, customFrameSettings),
                }}
              >
                {/* Sprocket holes for film frame */}
                {selectedFrame === "film" && (
                  <>
                    {/* Left sprocket holes - rectangular, minimal border radius */}
                    <div
                      className="absolute left-0 top-0 bottom-0 flex flex-col justify-between z-10"
                      style={{ height: "100%", gap: 0 }}
                    >
                      {Array.from({ length: 18 }).map((_, i) => (
                        <span
                          key={i}
                          className="block w-2 h-3 rounded-[2px] bg-white my-[6px]"
                        />
                      ))}
                    </div>
                    {/* Right sprocket holes - rectangular, minimal border radius */}
                    <div
                      className="absolute right-0 top-0 bottom-0 flex flex-col justify-between z-10"
                      style={{ height: "100%", gap: 0 }}
                    >
                      {Array.from({ length: 18 }).map((_, i) => (
                        <span
                          key={i}
                          className="block w-2 h-3 rounded-[2px] bg-white my-[6px]"
                        />
                      ))}
                    </div>
                  </>
                )}
                {/* Photo strip: vertical stack of captured images with gaps */}
                {capturedImages.length > 0 ? (
                  <div
                    className="flex flex-col items-center photostrip-container"
                    style={{
                      width: "auto",
                      position: "relative",
                      zIndex: 20,
                      outline: "none",
                      border: "none",
                    }}
                    onClick={(e) => {
                      if (selectedSticker) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const newSticker = {
                          id: Date.now(),
                          stickerId: selectedSticker,
                          photoIndex: -1, // -1 means placed on the strip itself
                          x: x,
                          y: y,
                        };

                        setPlacedStickers((prev) => [...prev, newSticker]);
                        setSelectedSticker(null);
                      }
                    }}
                    onMouseDown={(e) => {
                      if (selectedSticker) {
                        // Allow the click to bubble up to the parent
                        e.stopPropagation();
                      }
                    }}
                  >
                    {selectedSticker && (
                      <div
                        className="absolute inset-0 pointer-events-auto z-10"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;

                          const newSticker = {
                            id: Date.now() + Math.random(),
                            stickerId: selectedSticker,
                            photoIndex: -1,
                            x: x,
                            y: y,
                          };

                          setPlacedStickers((prev) => [...prev, newSticker]);
                          setSelectedSticker(null);
                        }}
                      />
                    )}
                    {capturedImages.map((src, idx) => {
                      let imgStyle = {
                        borderRadius: 0,
                        background: "#eee",
                        display: "block",
                        border: "none",
                        boxShadow: "none",
                      };
                      let imgClass = `object-cover w-56 h-40 ${
                        idx !== capturedImages.length - 1 ? "mb-4" : ""
                      }`;
                      if (selectedFrame === "film") {
                        imgStyle = {
                          ...imgStyle,
                          border: "4px solid #fff",
                          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.18)",
                        };
                      } else if (selectedFrame === "modern") {
                        imgStyle = {
                          ...imgStyle,
                          borderRadius: 4, // smaller radius for the photo
                          border: "2px solid #e5e7eb",
                          boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)",
                        };
                      } else if (selectedFrame === "custom") {
                        const cornerRadiusMap = {
                          none: 0,
                          sm: 4,
                          md: 8,
                          lg: 12,
                          xl: 16,
                        };
                        imgStyle = {
                          ...imgStyle,
                          borderRadius:
                            cornerRadiusMap[
                              customFrameSettings.cornerRadius || "none"
                            ],
                        };
                      }

                      // Get stickers for this photo
                      const photoStickers = placedStickers.filter(
                        (sticker) => sticker.photoIndex === idx
                      );

                      return (
                        <div
                          key={src + idx}
                          className="relative"
                          style={{ position: "relative" }}
                        >
                          <img
                            src={src}
                            alt={`Strip ${idx + 1}`}
                            className={imgClass}
                            style={{
                              ...imgStyle,
                              ...getFilterStyle(selectedFilter),
                            }}
                            onClick={(e) => {
                              if (selectedSticker) {
                                e.stopPropagation();
                                handleStickerPlacement(idx, e);
                              }
                            }}
                            onMouseDown={(e) => {
                              if (selectedSticker) {
                                e.stopPropagation();
                              }
                            }}
                          />
                          {/* Render placed stickers for this photo */}
                          {photoStickers.map((sticker) => (
                            <div
                              key={sticker.id}
                              className="absolute cursor-pointer hover:opacity-80 transition-opacity"
                              style={{
                                left: sticker.x - 15,
                                top: sticker.y - 15,
                                zIndex: 30,
                                width: "30px",
                                height: "30px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                removeSticker(sticker.id);
                              }}
                            >
                              <img
                                src={`/stickers/${sticker.stickerId}.png`}
                                alt="Placed sticker"
                                className="w-full h-full object-contain"
                                title="Click to remove"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  removeSticker(sticker.id);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })}

                    {/* Render stickers placed on the strip itself (not on photos) */}
                    {placedStickers
                      .filter((sticker) => sticker.photoIndex === -1)
                      .map((sticker) => (
                        <div
                          key={sticker.id}
                          className="absolute cursor-pointer hover:opacity-80 transition-opacity"
                          style={{
                            left: sticker.x - 15,
                            top: sticker.y - 15,
                            zIndex: 30,
                            width: "30px",
                            height: "30px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeSticker(sticker.id);
                          }}
                        >
                          <img
                            src={`/stickers/${sticker.stickerId}.png`}
                            alt="Placed sticker"
                            className="w-full h-full object-contain"
                            title="Click to remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              removeSticker(sticker.id);
                            }}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-2xl">No photos</div>
                )}

                {/* Message Space and Date */}
                {capturedImages.length > 0 && (
                  <div className="w-full mt-6 text-center">
                    {/* Message space - placeholder for future feature */}
                    <div className="h-16 border-t border-gray-200 pt-2 mb-2">
                      <div className="text-xs text-gray-400 italic">
                        Message space (coming soon)
                      </div>
                    </div>
                    {/* Date - at the very bottom */}
                    <div className="text-sm text-gray-600">
                      {new Date().toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Right: Cards (Frames & Filters side by side, Stickers below) */}
            <div className="flex flex-col items-start gap-6 -mr-44">
              {/* Top row: Frames and Filters side by side */}
              <div className="flex flex-row items-start gap-8">
                <div className="bg-white shadow-lg flex flex-col items-center justify-center p-8 min-h-[140px] min-w-[320px]">
                  <Frames
                    selected={selectedFrame}
                    onChange={setSelectedFrame}
                    customSettings={customFrameSettings}
                    onCustomSettingsChange={setCustomFrameSettings}
                  />
                </div>
                <div className="bg-white shadow-lg flex flex-col items-center justify-center p-8 min-h-[140px] min-w-[320px]">
                  <Filters
                    selected={selectedFilter}
                    onChange={setSelectedFilter}
                    className="justify-start"
                  />
                </div>
              </div>
              {/* Bottom row: Stickers card */}
              <div className="bg-white shadow-lg flex flex-col items-center justify-center p-8 min-h-[140px] min-w-[320px]">
                <Stickers
                  selected={selectedSticker}
                  onChange={setSelectedSticker}
                  onUndo={handleUndo}
                  className="justify-start"
                />
                {selectedSticker && (
                  <div className="mt-4 text-xs text-gray-600 text-center">
                    Click on a photo to place the sticker
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Show Navbar in editor step */}
          <Navbar
            showPhotobooth={true}
            onSettingsOpen={handleSettingsOpen}
            onCapture={handleCapture}
            isCapturing={isCapturing}
            canRetake={canRetake}
            onRetake={handleRetake}
            onPrint={handlePrint}
          />
        </div>
      )}
      {/* Full-screen loading overlay: always on top, never hides content */}
      {false && step === "loading" && (
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
        .animate-twinkle {
          animation: twinkle-star 1.3s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes twinkle-star {
          0% {
            opacity: 0.7;
            transform: scale(1) rotate(0deg);
          }
          30% {
            opacity: 1;
            transform: scale(1.25) rotate(8deg);
          }
          60% {
            opacity: 0.8;
            transform: scale(0.95) rotate(-8deg);
          }
          100% {
            opacity: 0.7;
            transform: scale(1) rotate(0deg);
          }
        }
        .animate-star-shine {
          animation: star-shine 1.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes star-shine {
          0% {
            filter: brightness(1) drop-shadow(0 0 0px gold);
            transform: scale(1) rotate(0deg);
          }
          20% {
            filter: brightness(1.3) drop-shadow(0 0 8px gold);
            transform: scale(1.18) rotate(6deg);
          }
          50% {
            filter: brightness(1.1) drop-shadow(0 0 4px gold);
            transform: scale(0.95) rotate(-6deg);
          }
          100% {
            filter: brightness(1) drop-shadow(0 0 0px gold);
            transform: scale(1) rotate(0deg);
          }
        }

        .draggable-svg {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .draggable-svg.svg-click-effect {
          animation: svg-pop-spin 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes svg-pop-spin {
          0% {
            transform: scale(1) rotate(0deg);
          }
          30% {
            transform: scale(1.3) rotate(10deg);
          }
          60% {
            transform: scale(0.9) rotate(-10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
        .svg-entrance {
          opacity: 0;
          transform: scale(0.7) translateY(24px);
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
            transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .svg-entrance-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .draggable-svg-trail {
          transition: opacity 0.5s ease-in-out;
        }
        .animate-capture-flash {
          animation: capture-flash 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes capture-flash {
          0% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }
        .preview-elegant-in {
          animation: preview-elegant-in 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
        @keyframes preview-elegant-in {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(40px);
            box-shadow: 0 8px 32px 0 rgba(168, 139, 250, 0.18);
          }
          60% {
            opacity: 1;
            transform: scale(1.08) translateY(-8px);
            box-shadow: 0 8px 32px 0 rgba(236, 72, 153, 0.18);
          }
          80% {
            opacity: 1;
            transform: scale(0.97) translateY(2px);
            box-shadow: 0 4px 16px 0 rgba(168, 139, 250, 0.12);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            box-shadow: none;
          }
        }
        /* Prevent unwanted focus outlines and cursor styles */
        .photostrip-container:focus {
          outline: none !important;
        }
        .photostrip-container *:focus {
          outline: none !important;
        }
      `}</style>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={handleSettingsClose}
        onSave={handleSettingsSave}
        currentSettings={settings}
      />
    </div>
  );
}
