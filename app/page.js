"use client";

import React, { useState, useEffect, useRef } from "react";
import SettingsModal from "./components/settings";
import Navbar from "./components/navbar";
import Frames from "./components/frames";
import Filters from "./components/filters";
import Stickers from "./components/stickers";
import Message from "./components/message";

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

  // Clamp position to viewport
  const clampToViewport = (x, y) => {
    // Assume icon is about 40x40px max (adjust if needed)
    const iconW = 40,
      iconH = 40;
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - iconW;
    const maxY = window.innerHeight - iconH;
    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY)),
    };
  };

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
    let newPos = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    newPos = clampToViewport(newPos.x, newPos.y);
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
    let newPos = { x: touch.clientX - offset.x, y: touch.clientY - offset.y };
    newPos = clampToViewport(newPos.x, newPos.y);
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

export default function Page() {
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
  const [showRefreshAnim, setShowRefreshAnim] = useState(false); // refresh sweep animation
  const [showPageTransition, setShowPageTransition] = useState(false); // transition to editor
  const [showEditorAnim, setShowEditorAnim] = useState(false); // animate editor components in
  const [isFramesPopoverOpen, setIsFramesPopoverOpen] = useState(false);

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

  // Reset editor entrance animation when leaving editor
  useEffect(() => {
    if (step !== "editor") {
      setShowEditorAnim(false);
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
    // Trigger sleek refresh sweep animation
    setShowRefreshAnim(true);
    // Clear content immediately so it feels like a refresh
    setCapturedImages([]);
    setAnimatedPreviews([]);
    setPlacedStickers([]);
    // Hide animation after it sweeps
    setTimeout(() => setShowRefreshAnim(false), 1200);
  };
  const handlePrint = () => {
    if (canRetake) {
      // Play a distinct, elegant radial glow transition
      setShowPageTransition(true);
      // Switch to editor mid-transition
      setTimeout(() => {
        setStep("editor");
        // Start editor component entrances shortly after mount
        setTimeout(() => setShowEditorAnim(true), 80);
      }, 480);
      // Clear the overlay after the animation completes
      setTimeout(() => setShowPageTransition(false), 1200);
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
  const [stripMessage, setStripMessage] = useState("");
  const [showStripDate, setShowStripDate] = useState(true);

  // Function to get CSS filter based on selected filter
  const getFilterStyle = (filterType) => {
    switch (filterType) {
      case "grayscale":
        return { filter: "grayscale(100%)" };
      case "brightness":
        return { filter: "brightness(1.3) contrast(1.1)" };
      case "blue":
        // Intense blue tone
        return {
          filter:
            "grayscale(20%) sepia(80%) hue-rotate(195deg) saturate(10) brightness(0.92) contrast(1.2)",
        };
      case "sepia":
        return { filter: "sepia(80%)" };
      case "vintage":
        return {
          filter: "sepia(40%) brightness(1.1) contrast(1.2) saturate(1.3)",
        };
      case "red":
        // Deep red room tone
        return {
          filter:
            "grayscale(0%) sepia(100%) hue-rotate(-20deg) saturate(16) brightness(0.9) contrast(1.18)",
        };
      case "none":
      default:
        return {};
    }
  };

  // Utilities to compute a readable text color against a given background
  const parseColorToRgb = (color) => {
    if (!color) return { r: 255, g: 255, b: 255 };
    const named = {
      white: { r: 255, g: 255, b: 255 },
      black: { r: 0, g: 0, b: 0 },
    };
    const lower = String(color).toLowerCase().trim();
    if (named[lower]) return named[lower];
    if (lower.startsWith("#")) {
      let hex = lower.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }
      const intVal = parseInt(hex.slice(0, 6), 16);
      return {
        r: (intVal >> 16) & 255,
        g: (intVal >> 8) & 255,
        b: intVal & 255,
      };
    }
    const rgbMatch = lower.match(
      /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
    );
    if (rgbMatch) {
      return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
    }
    // Fallback to white
    return { r: 255, g: 255, b: 255 };
  };

  const getRelativeLuminance = ({ r, g, b }) => {
    const srgb = [r, g, b].map((v) => v / 255);
    const linear = srgb.map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };

  const getContrastingTextColor = (backgroundColor) => {
    const rgb = parseColorToRgb(backgroundColor);
    const L = getRelativeLuminance(rgb);
    // Threshold around mid-luminance; choose near-black for light bg, near-white for dark bg
    return L > 0.5 ? "#111111" : "#FAFAFA";
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

  // Function to handle sticker placement (always relative to the whole photostrip)
  const handleStickerPlacement = (photoIndex, event) => {
    if (!selectedSticker || !photostripRef.current) return;

    const stripRect = photostripRef.current.getBoundingClientRect();
    const x = event.clientX - stripRect.left;
    const y = event.clientY - stripRect.top;

    const newSticker = {
      id: Date.now() + Math.random(),
      stickerId: selectedSticker,
      photoIndex: -1,
      x,
      y,
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

  // Immediate removal handler so a placed sticker disappears on first press
  const handleRemovePlacedStickerImmediate = (stickerId) => (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    removeSticker(stickerId);
    setSelectedSticker(null);
  };

  // Function to undo last placed sticker
  // NOTE: This removes the last sticker added, regardless of which photo or strip it is on (global undo)
  const handleUndo = () => {
    setPlacedStickers((prev) => {
      if (prev.length > 0) {
        return prev.slice(0, -1); // Remove the last placed sticker
      }
      return prev;
    });
  };

  useEffect(() => {
    if (step === "welcome") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [step]);

  // Add a ref to store the stickers array
  const stickersRef = useRef([]);
  // Refs to constrain dragging of placed stickers
  const photostripRef = useRef(null);
  const photoContainersRef = useRef({});
  // Ref to capture the entire strip (including frame, stickers, message, and date)
  const stripRootRef = useRef(null);

  // Lazy loader for html2canvas with CDN fallback (avoids bundler install issues)
  const loadHtml2Canvas = async () => {
    if (typeof window === "undefined") return null;
    if (window.html2canvas) return window.html2canvas;
    // Attempt dynamic import first (in case dependency is installed)
    try {
      const mod = await import("html2canvas");
      return mod.default || mod;
    } catch (_) {
      // Fallback to CDN
      await new Promise((resolve, reject) => {
        const existing = document.querySelector(
          'script[data-lib="html2canvas-cdn"]'
        );
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", reject);
          return;
        }
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("data-lib", "html2canvas-cdn");
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      });
      return window.html2canvas || null;
    }
  };

  // Fallback: load dom-to-image-more from CDN if needed
  const loadDomToImage = async () => {
    if (typeof window === "undefined") return null;
    if (window.domtoimage) return window.domtoimage;
    await new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[data-lib="dom-to-image-more-cdn"]'
      );
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", reject);
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/dom-to-image-more@3.4.1/dist/dom-to-image-more.min.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("data-lib", "dom-to-image-more-cdn");
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
    return window.domtoimage || null;
  };

  // Prepare a clean offscreen clone of the strip for pixel-accurate capture
  const createCaptureTarget = (sourceEl) => {
    const rect = sourceEl.getBoundingClientRect();
    const computed = window.getComputedStyle(sourceEl);
    const computedBg =
      computed.backgroundColor && computed.backgroundColor !== "transparent"
        ? computed.backgroundColor
        : "#ffffff";
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-10000px";
    wrapper.style.top = "-10000px";
    wrapper.style.zIndex = "-1";
    wrapper.style.padding = "0";
    wrapper.style.margin = "0";
    wrapper.style.isolation = "isolate";

    const clone = sourceEl.cloneNode(true);
    // Ensure explicit size and remove shadows on the clone root
    clone.style.width = `${Math.ceil(rect.width)}px`;
    clone.style.minWidth = `${Math.ceil(rect.width)}px`;
    clone.style.height = `${Math.ceil(rect.height)}px`;
    clone.style.minHeight = `${Math.ceil(rect.height)}px`;
    clone.style.boxSizing = "border-box";
    clone.style.boxShadow = "none";
    clone.style.filter = "none";
    clone.style.background = computedBg;

    // Hide the transparent absolute overlay inside the photostrip container
    try {
      const overlay = clone.querySelector(".photostrip-container > .absolute");
      if (overlay) overlay.style.display = "none";
    } catch {}

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    return {
      wrapper,
      clone,
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
    };
  };
  // Track placement gesture on the strip to avoid duplicate placement during drag
  const stripPlaceRef = useRef({
    isPlacing: false,
    startX: 0,
    startY: 0,
    moved: false,
  });

  // Start drag for a placed sticker. If the pointer does not move beyond a small
  // threshold, treat it as a click and remove the sticker. Otherwise, drag it
  // within the bounds of its container (photo or photostrip).
  const beginPlacedStickerInteraction = (sticker, containerEl) => (e) => {
    const container = photostripRef.current || containerEl;
    if (!container) return;
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    const startClientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const startClientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    const startX = sticker.x;
    const startY = sticker.y;

    const halfSize = 15; // sticker visual half-size (30px total)
    const containerWidth =
      container.clientWidth || container.getBoundingClientRect().width;
    const containerHeight =
      container.clientHeight || container.getBoundingClientRect().height;
    const minX = halfSize;
    const minY = halfSize;
    const maxX = Math.max(halfSize, containerWidth - halfSize);
    const maxY = Math.max(halfSize, containerHeight - halfSize);

    let didMove = false;
    const moveThreshold = 3; // px

    const handleMove = (ev) => {
      const clientX = ev.clientX ?? (ev.touches && ev.touches[0]?.clientX) ?? 0;
      const clientY = ev.clientY ?? (ev.touches && ev.touches[0]?.clientY) ?? 0;
      const dx = clientX - startClientX;
      const dy = clientY - startClientY;
      if (!didMove && Math.abs(dx) + Math.abs(dy) > moveThreshold) {
        didMove = true;
      }
      if (didMove) {
        const newX = Math.min(maxX, Math.max(minX, startX + dx));
        const newY = Math.min(maxY, Math.max(minY, startY + dy));
        setPlacedStickers((prev) =>
          prev.map((s) =>
            s.id === sticker.id ? { ...s, x: newX, y: newY } : s
          )
        );
      }
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
      if (!didMove) {
        removeSticker(sticker.id);
        setSelectedSticker(null);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    // Fallback touch listeners (in case pointer events are not supported)
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp, { passive: true });
  };

  // Begin placement on the strip: only place on a tap/click (no drag)
  const handleStripPointerDown = (e) => {
    if (!selectedSticker || !photostripRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    stripPlaceRef.current = {
      isPlacing: true,
      startX: clientX,
      startY: clientY,
      moved: false,
    };

    const move = (ev) => {
      const mx = ev.clientX ?? (ev.touches && ev.touches[0]?.clientX) ?? 0;
      const my = ev.clientY ?? (ev.touches && ev.touches[0]?.clientY) ?? 0;
      if (!stripPlaceRef.current.moved) {
        const dx = Math.abs(mx - stripPlaceRef.current.startX);
        const dy = Math.abs(my - stripPlaceRef.current.startY);
        if (dx + dy > 4) stripPlaceRef.current.moved = true;
      }
    };

    const up = (ev) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      if (!stripPlaceRef.current.isPlacing) return;
      const didMove = stripPlaceRef.current.moved;
      stripPlaceRef.current.isPlacing = false;
      if (didMove) return; // treat as drag; no placement
      if (!photostripRef.current) return;
      const rect = photostripRef.current.getBoundingClientRect();
      const px =
        (ev.clientX ??
          (ev.changedTouches && ev.changedTouches[0]?.clientX) ??
          0) - rect.left;
      const py =
        (ev.clientY ??
          (ev.changedTouches && ev.changedTouches[0]?.clientY) ??
          0) - rect.top;
      const newSticker = {
        id: Date.now() + Math.random(),
        stickerId: selectedSticker,
        photoIndex: -1,
        x: px,
        y: py,
      };
      setPlacedStickers((prev) => [...prev, newSticker]);
      setTimeout(() => setSelectedSticker(null), 0);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up, { passive: true });
  };

  // Determine dynamic text color for strip message/date based on current frame background
  const currentFrameStyle = getFrameStyle(selectedFrame, customFrameSettings);
  const stripTextColor = getContrastingTextColor(currentFrameStyle.background);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 ${
        step === "welcome"
          ? "flex items-center justify-center overflow-hidden"
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
              `text-lg font-medium text-purple-500 text-center transition-all duration-400 ease-out transform ` +
              (showCard
                ? "opacity-100 translate-y-0 opacity-80"
                : "opacity-0 translate-y-8")
            }
          >
            Capture it, remember it
          </h2>
          {step === "welcome" && (
            <button
              className={
                `mt-12 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-white text-md font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none cursor-pointer transition-all duration-400 ease-out transform ` +
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
              className="text-md font-medium text-center text-purple-500 mt-2"
              style={{ letterSpacing: 0.2 }}
            >
              Capture it, remember it
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
                          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
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
            isEditorStep={false}
          />
        </>
      )}
      {/* Editor Step: Photo Strip Editor */}
      {step === "editor" && (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center mt-12 mb-8 transition-all duration-700">
          {/* Logo and Title */}
          <div
            className={
              "flex flex-row items-center gap-4 mb-4" +
              (showEditorAnim ? " editor-entrance" : "")
            }
            style={{ animationDelay: showEditorAnim ? "60ms" : undefined }}
          >
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
              className={
                "flex flex-col items-center justify-center mr-60" +
                (showEditorAnim ? " editor-entrance" : "")
              }
              style={{
                minWidth: 320,
                animationDelay: showEditorAnim ? "120ms" : undefined,
              }}
            >
              <div
                ref={stripRootRef}
                className={`shadow-2xl flex flex-col items-center justify-center py-6 px-4 relative w-[16rem]`}
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
                    className="flex flex-col items-center photostrip-container w-56"
                    style={{
                      position: "relative",
                      zIndex: 20,
                      outline: "none",
                      border: "none",
                    }}
                    ref={photostripRef}
                    onPointerDown={handleStripPointerDown}
                    onTouchStart={handleStripPointerDown}
                  >
                    {/* Removed overlay to avoid duplicate placements and allow photo clicks */}
                    {/* Transparent layer kept for consistent stacking but no click handler to avoid duplicates */}
                    <div className="absolute inset-0" style={{ zIndex: 1 }} />

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
                          ref={(el) => (photoContainersRef.current[idx] = el)}
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
                                // Prevent image drag-start from triggering undesired behavior
                                e.preventDefault();
                                e.stopPropagation();
                              }
                            }}
                            draggable={false}
                          />
                          {/* Render placed stickers for this photo */}
                          {photoStickers.map((sticker) => {
                            const stickerObj = stickersRef.current.find(
                              (s) => s.id === sticker.stickerId
                            );
                            return (
                              <div
                                key={sticker.id}
                                className="absolute cursor-pointer hover:opacity-80 transition-opacity"
                                style={{
                                  left: sticker.x - 15,
                                  top: sticker.y - 15,
                                  zIndex: 30,
                                  width: "30px",
                                  height: "30px",
                                  touchAction: "none",
                                  userSelect: "none",
                                }}
                                onPointerDown={(e) =>
                                  beginPlacedStickerInteraction(
                                    sticker,
                                    photoContainersRef.current[idx]
                                  )(e)
                                }
                                onClick={(e) => {
                                  // Prevent bubbling to strip container which would place a new sticker
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDragStart={(e) => e.preventDefault()}
                              >
                                <img
                                  src={stickerObj ? stickerObj.src : ""}
                                  alt="Placed sticker"
                                  className="w-full h-full object-contain"
                                  draggable={false}
                                  title="Drag to move or click to remove"
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Render stickers placed on the strip itself (not on photos) */}
                    {placedStickers
                      .filter((sticker) => sticker.photoIndex === -1)
                      .map((sticker) => {
                        const stickerObj = stickersRef.current.find(
                          (s) => s.id === sticker.stickerId
                        );
                        return (
                          <div
                            key={sticker.id}
                            className="absolute cursor-pointer hover:opacity-80 transition-opacity"
                            style={{
                              left: sticker.x - 15,
                              top: sticker.y - 15,
                              zIndex: 30,
                              width: "30px",
                              height: "30px",
                              touchAction: "none",
                              userSelect: "none",
                            }}
                            onPointerDown={(e) =>
                              beginPlacedStickerInteraction(
                                sticker,
                                photostripRef.current
                              )(e)
                            }
                            onClick={(e) => {
                              // Prevent bubbling to strip container which would place a new sticker
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onDragStart={(e) => e.preventDefault()}
                          >
                            <img
                              src={stickerObj ? stickerObj.src : ""}
                              alt="Placed sticker"
                              className="w-full h-full object-contain"
                              draggable={false}
                              title="Drag to move or click to remove"
                            />
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-gray-400 text-2xl">No photos</div>
                )}

                {/* Message Space and Date - reserve fixed space so height doesn't shift */}
                {capturedImages.length > 0 && (
                  <div className="w-full mt-6 text-center select-none">
                    <div className="w-full border-t border-gray-200 pt-2 mb-2 px-3 flex justify-center">
                      <div
                        className="text-md whitespace-pre-wrap break-words break-all h-20 overflow-hidden w-full [font-family:var(--font-cedarville),cursive]"
                        style={{ color: stripTextColor }}
                      >
                        {stripMessage}
                      </div>
                    </div>
                    <div
                      className="w-full text-xs h-5 flex items-center justify-center"
                      style={{ color: stripTextColor }}
                    >
                      {showStripDate
                        ? new Date().toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Right: Cards (Frames & Filters side by side, Stickers below) */}
            <div
              className={
                "flex flex-col items-start gap-6 -mr-44" +
                (showEditorAnim ? " editor-entrance" : "")
              }
              style={{ animationDelay: showEditorAnim ? "160ms" : undefined }}
            >
              {/* Top row: Frames and Filters side by side */}
              <div className="flex flex-row items-stretch gap-8">
                <div
                  className={
                    "bg-white shadow-lg flex flex-col items-center justify-center p-8 min-h-[140px] min-w-[320px]" +
                    (showEditorAnim ? " editor-entrance" : "") +
                    (isFramesPopoverOpen ? " relative z-50" : "")
                  }
                  style={{
                    animationDelay: showEditorAnim ? "220ms" : undefined,
                    overflow: "visible",
                  }}
                >
                  <Frames
                    selected={selectedFrame}
                    onChange={setSelectedFrame}
                    customSettings={customFrameSettings}
                    onCustomSettingsChange={setCustomFrameSettings}
                    onPopoverOpenChange={setIsFramesPopoverOpen}
                  />
                </div>
                <div
                  className={
                    "bg-white shadow-lg flex flex-col items-center justify-center p-8 min-h-[140px] min-w-[320px]" +
                    (showEditorAnim ? " editor-entrance" : "")
                  }
                  style={{
                    animationDelay: showEditorAnim ? "260ms" : undefined,
                  }}
                >
                  <Filters
                    selected={selectedFilter}
                    onChange={setSelectedFilter}
                    className="justify-start"
                  />
                </div>
              </div>
              {/* Bottom row: Stickers card + Message card side by side */}
              <div className="flex flex-row items-start gap-8">
                <div
                  className={
                    "bg-white shadow-lg flex flex-col items-center justify-center p-8 min-h-[360px] min-w-[320px]" +
                    (showEditorAnim ? " editor-entrance" : "")
                  }
                  style={{
                    animationDelay: showEditorAnim ? "320ms" : undefined,
                  }}
                >
                  <Stickers
                    selected={selectedSticker}
                    onChange={setSelectedSticker}
                    onUndo={handleUndo}
                    className="justify-start"
                    onStickersInit={(arr) => (stickersRef.current = arr)}
                  />
                  <div className="mt-4 text-xs text-gray-600 text-center h-5 leading-5 overflow-hidden">
                    {selectedSticker
                      ? "Click on the photo strip to place the sticker"
                      : ""}
                  </div>
                </div>
                <div
                  className={
                    "bg-white shadow-lg flex flex-col items-center justify-start p-8 min-h-[360px] min-w-[320px]" +
                    (showEditorAnim ? " editor-entrance" : "")
                  }
                  style={{
                    animationDelay: showEditorAnim ? "360ms" : undefined,
                  }}
                >
                  <Message
                    value={stripMessage}
                    onChange={setStripMessage}
                    showDate={showStripDate}
                    onToggleDate={setShowStripDate}
                    className="justify-start"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Show Navbar in editor step */}
          <Navbar
            showPhotobooth={true}
            onSettingsOpen={handleSettingsOpen}
            onDownload={async () => {
              try {
                if (!stripRootRef.current) return;
                const el = stripRootRef.current;
                // Ensure fonts are ready for accurate rendering
                if (
                  document.fonts &&
                  typeof document.fonts.ready?.then === "function"
                ) {
                  try {
                    await document.fonts.ready;
                  } catch {}
                }
                let dataUrl = null;
                // Work on a clean offscreen clone to avoid shadows/extra background
                const { wrapper, clone, width, height } =
                  createCaptureTarget(el);
                // Try html2canvas first
                try {
                  const html2canvas = await loadHtml2Canvas();
                  if (html2canvas) {
                    const canvas = await html2canvas(clone, {
                      backgroundColor: computed.backgroundColor || "#ffffff",
                      scale: 2,
                      useCORS: true,
                      logging: false,
                    });
                    dataUrl = canvas.toDataURL("image/png");
                  }
                } catch (e) {
                  // Fall through to dom-to-image-more on parsing errors (e.g., oklch)
                }
                // Fallback to dom-to-image-more if needed
                if (!dataUrl) {
                  const domtoimage = await loadDomToImage();
                  if (!domtoimage) return;
                  const scale = 2;
                  dataUrl = await domtoimage.toPng(clone, {
                    quality: 1,
                    bgcolor: computed.backgroundColor || "#ffffff",
                    width: width * scale,
                    height: height * scale,
                    style: {
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      width: `${width}px`,
                      height: `${height}px`,
                    },
                    filter: () => true,
                  });
                }
                // Clean up the offscreen DOM
                try {
                  document.body.removeChild(wrapper);
                } catch {}
                if (dataUrl) {
                  const link = document.createElement("a");
                  const ts = new Date()
                    .toISOString()
                    .replace(/[:.]/g, "-")
                    .slice(0, 19);
                  link.href = dataUrl;
                  link.download = `snappy-photostrip-${ts}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              } catch (err) {
                // Fail silently for now; could show a toast in future
                console.error("Download failed", err);
              }
            }}
            onCapture={handleCapture}
            isCapturing={isCapturing}
            canRetake={canRetake}
            onRetake={handleRetake}
            onPrint={handlePrint}
            isEditorStep={true}
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
      {/* Retake "refresh sweep" animation overlay */}
      {showRefreshAnim && (
        <div className="refresh-overlay">
          <div className="refresh-sweep" />
        </div>
      )}
      {/* Page transition overlay (photobooth -> editor) */}
      {showPageTransition && (
        <div className="page-transition-overlay">
          <div className="page-transition-glow" />
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

        /* Refresh sweep animation */
        .refresh-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          pointer-events: none;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          animation: refresh-fade 1200ms ease-in-out forwards;
          will-change: background;
        }
        .refresh-sweep {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -50%;
          width: 70%;
          background: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.25) 35%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(255, 255, 255, 0.25) 65%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(10px);
          transform: skewX(-10deg) translateX(0);
          animation: refresh-sweep 1200ms cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
          will-change: transform, opacity;
        }
        @keyframes refresh-sweep {
          0% {
            transform: skewX(-10deg) translateX(-120%);
            opacity: 0.9;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: skewX(-10deg) translateX(220%);
            opacity: 0;
          }
        }
        @keyframes refresh-fade {
          0% {
            background: rgba(255, 255, 255, 0.03);
          }
          50% {
            background: rgba(255, 255, 255, 0.07);
          }
          100% {
            background: rgba(255, 255, 255, 0);
          }
        }

        /* Page transition: elegant radial glow (photobooth -> editor) */
        .page-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 70;
          pointer-events: none;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          animation: page-fade 1200ms ease-in-out forwards;
          will-change: background;
        }
        .page-transition-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 20vmax;
          height: 20vmax;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.7);
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.5) 40%,
            rgba(255, 255, 255, 0.15) 70%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(10px);
          animation: page-glow 1200ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity, filter;
        }
        @keyframes page-glow {
          0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.85;
            filter: blur(8px);
          }
          50% {
            opacity: 1;
            filter: blur(12px);
          }
          80% {
            opacity: 0.7;
            filter: blur(14px);
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
            filter: blur(18px);
          }
        }
        @keyframes page-fade {
          0% {
            background: rgba(255, 255, 255, 0.02);
          }
          50% {
            background: rgba(255, 255, 255, 0.08);
          }
          100% {
            background: rgba(255, 255, 255, 0);
          }
        }

        /* Editor entrances - smooth, simple */
        .editor-entrance {
          opacity: 0;
          transform: translateY(8px) scale(0.99);
          animation: editor-enter 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes editor-enter {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.99);
          }
          70% {
            opacity: 1;
            transform: translateY(0) scale(1.005);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .editor-entrance {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
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
