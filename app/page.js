"use client";

import React, { useState, useEffect, useRef } from "react";
import SettingsModal from "./components/settings";
import Navbar from "./components/navbar";
import Frames from "./components/frames";
import Filters from "./components/filters";
import Stickers from "./components/stickers";
import Message from "./components/message";

const applyCanvasFilter = (canvas, ctx, filterType) => {
  if (filterType === "none") return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  switch (filterType) {
    case "grayscale":
      for (let i = 0; i < data.length; i += 4) {
        const gray =
          data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray; // Red
        data[i + 1] = gray; // Green
        data[i + 2] = gray; // Blue
      }
      break;

    case "brightness":
      // Match CSS filter: brightness(1.3) contrast(1.1)
      const brightnessFactor = 1.3;
      const contrastFactor = 1.1;
      for (let i = 0; i < data.length; i += 4) {
        // Apply brightness first (multiply by factor)
        let r = data[i] * brightnessFactor;
        let g = data[i + 1] * brightnessFactor;
        let b = data[i + 2] * brightnessFactor;

        // Apply contrast (shift around midpoint 128)
        r = (r - 128) * contrastFactor + 128;
        g = (g - 128) * contrastFactor + 128;
        b = (b - 128) * contrastFactor + 128;

        // Clamp values to 0-255 range
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
      }
      break;

    case "sepia":
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
      break;

    case "blue":
      // Intense blue tone effect
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Desaturate slightly, then shift hue towards blue and increase saturation
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        const mixFactor = 0.2;

        let newR = gray * mixFactor + r * (1 - mixFactor);
        let newG = gray * mixFactor + g * (1 - mixFactor);
        let newB = gray * mixFactor + b * (1 - mixFactor);

        // Shift towards blue and increase saturation
        newR = newR * 0.2 + newB * 0.1;
        newG = newG * 0.4 + newB * 0.1;
        newB = Math.min(255, newB * 2.5);

        data[i] = Math.max(0, Math.min(255, newR * 0.92));
        data[i + 1] = Math.max(0, Math.min(255, newG * 0.92));
        data[i + 2] = Math.max(0, Math.min(255, newB * 0.92));
      }
      break;

    case "red":
      // Deep red tone effect
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Shift towards red and increase saturation
        const newR = Math.min(255, r * 2.2 + g * 0.1);
        const newG = Math.max(0, g * 0.3 + r * 0.1);
        const newB = Math.max(0, b * 0.3 + r * 0.1);

        data[i] = newR * 0.9;
        data[i + 1] = newG * 0.9;
        data[i + 2] = newB * 0.9;
      }
      break;
  }

  ctx.putImageData(imageData, 0, 0);
};

// Move getFrameStyle outside the component so it's accessible to createFilteredPhotoStrip
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
        borderRadius: 8, // Add border radius for the strip container
      };
    case "custom":
      return {
        background: customSettings.backgroundColor || "white",
        border: `2px solid ${customSettings.borderColor || "black"}`,
        borderRadius: customSettings.stripBorderRadius || 0, // Add support for custom strip border radius
      };
    default:
      return {
        background: "#fff",
        border: "none",
        borderRadius: 0,
      };
  }
};

// Move getContrastingTextColor outside the component as well since it's used by createFilteredPhotoStrip
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
  const rgbMatch = lower.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
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

// Updated createFilteredPhotoStrip function to match editor preview exactly
const createFilteredPhotoStrip = async (
  capturedImages,
  selectedFilter,
  selectedFrame,
  customFrameSettings,
  stripMessage,
  showStripDate,
  placedStickers,
  stickersRef
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Match the editor dimensions exactly
  const stripWidth = 256; // 16rem = 256px (w-64)
  const photoWidth = 224; // 14rem = 224px (w-56)
  const photoHeight = 160; // 10rem = 160px (h-40)
  const photoSpacing = 16; // 1rem = 16px (mb-4)
  const padding = 24; // 1.5rem = 24px (py-6)
  const messageSpace = stripMessage || showStripDate ? 120 : 40; // More space for message/date

  canvas.width = stripWidth;
  canvas.height =
    photoHeight * capturedImages.length +
    photoSpacing * (capturedImages.length - 1) +
    padding * 2 +
    messageSpace;

  // Apply frame background
  const frameStyle = getFrameStyle(selectedFrame, customFrameSettings);
  ctx.fillStyle = frameStyle.background || "#ffffff";

  // If there's a border radius, use roundRect instead of fillRect
  if (frameStyle.borderRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, frameStyle.borderRadius);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Draw frame border if needed
  if (frameStyle.border && frameStyle.border !== "none") {
    const borderWidth = parseInt(
      frameStyle.border.match(/(\d+)px/)?.[1] || "2"
    );
    const borderColor =
      frameStyle.border.match(
        /(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|[a-zA-Z]+)/
      )?.[0] || "#000000";

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;

    // Use roundRect for border if there's a border radius
    if (frameStyle.borderRadius > 0) {
      ctx.beginPath();
      ctx.roundRect(
        borderWidth / 2,
        borderWidth / 2,
        canvas.width - borderWidth,
        canvas.height - borderWidth,
        Math.max(0, frameStyle.borderRadius - borderWidth / 2)
      );
      ctx.stroke();
    } else {
      ctx.strokeRect(
        borderWidth / 2,
        borderWidth / 2,
        canvas.width - borderWidth,
        canvas.height - borderWidth
      );
    }
  }

  // Draw sprocket holes for film frame - FIXED to match editor exactly
  if (selectedFrame === "film") {
    ctx.fillStyle = "#ffffff";
    const holeWidth = 8; // w-2 = 8px
    const holeHeight = 12; // h-3 = 12px

    // Calculate exact spacing to match editor: 18 holes with even distribution
    const totalHoles = 18;
    const availableHeight = canvas.height - padding * 2; // Remove top and bottom padding
    const holeSpacing = availableHeight / (totalHoles - 1); // Space between hole centers

    // Left and right sprocket holes
    for (let i = 0; i < totalHoles; i++) {
      const centerY = padding + i * holeSpacing;
      const holeY = centerY - holeHeight / 2; // Center the hole vertically

      // Only draw if the hole fits within the canvas bounds
      if (holeY >= 0 && holeY + holeHeight <= canvas.height) {
        // Left sprocket holes
        ctx.beginPath();
        ctx.roundRect(0, holeY, holeWidth, holeHeight, 2);
        ctx.fill();

        // Right sprocket holes
        ctx.beginPath();
        ctx.roundRect(
          canvas.width - holeWidth,
          holeY,
          holeWidth,
          holeHeight,
          2
        );
        ctx.fill();
      }
    }
  }

  // Process each photo with exact editor styling
  for (let i = 0; i < capturedImages.length; i++) {
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const y = padding + i * (photoHeight + photoSpacing);
        const x = (stripWidth - photoWidth) / 2; // Center photo exactly like editor

        // Create temporary canvas for this photo to apply filter
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = photoWidth;
        tempCanvas.height = photoHeight;

        // Draw image to temp canvas
        tempCtx.drawImage(img, 0, 0, photoWidth, photoHeight);

        // Apply filter
        applyCanvasFilter(tempCanvas, tempCtx, selectedFilter);

        // Draw the photo with frame-specific styling
        if (selectedFrame === "film") {
          // For film frame: white border around photo
          const borderWidth = 4;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            x - borderWidth,
            y - borderWidth,
            photoWidth + borderWidth * 2,
            photoHeight + borderWidth * 2
          );

          // Add subtle shadow for the white border
          ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 2;
          ctx.fillRect(
            x - borderWidth,
            y - borderWidth,
            photoWidth + borderWidth * 2,
            photoHeight + borderWidth * 2
          );
          ctx.shadowColor = "transparent"; // Reset shadow
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;

          // Draw filtered image
          ctx.drawImage(tempCanvas, x, y);
        } else if (selectedFrame === "modern") {
          // For modern frame: light gray border and rounded corners
          const borderWidth = 2;
          ctx.fillStyle = "#e5e7eb";
          ctx.beginPath();
          ctx.roundRect(
            x - borderWidth,
            y - borderWidth,
            photoWidth + borderWidth * 2,
            photoHeight + borderWidth * 2,
            4
          );
          ctx.fill();

          // Clip for rounded photo
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(x, y, photoWidth, photoHeight, 4);
          ctx.clip();
          ctx.drawImage(tempCanvas, x, y);
          ctx.restore();
        } else if (selectedFrame === "custom") {
          // Handle custom frame corner radius
          const cornerRadiusMap = {
            none: 0,
            sm: 4,
            md: 8,
            lg: 12,
            xl: 16,
          };
          const radius =
            cornerRadiusMap[customFrameSettings.cornerRadius || "none"];

          if (radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, photoWidth, photoHeight, radius);
            ctx.clip();
            ctx.drawImage(tempCanvas, x, y);
            ctx.restore();
          } else {
            ctx.drawImage(tempCanvas, x, y);
          }
        } else {
          // Classic frame: no border, just the photo
          ctx.drawImage(tempCanvas, x, y);
        }

        resolve();
      };
      img.src = capturedImages[i];
    });
  }

  // Draw stickers exactly as they appear in the editor
  for (const sticker of placedStickers) {
    const stickerObj = stickersRef.current.find(
      (s) => s.id === sticker.stickerId
    );
    if (stickerObj) {
      await new Promise((resolve) => {
        const stickerImg = new Image();
        stickerImg.onload = () => {
          const stickerSize = 30; // Match editor size exactly
          // Position relative to the strip container, accounting for padding
          const adjustedX = sticker.x;
          const adjustedY = sticker.y + padding; // Account for top padding

          ctx.drawImage(
            stickerImg,
            adjustedX - stickerSize / 2,
            adjustedY - stickerSize / 2,
            stickerSize,
            stickerSize
          );
          resolve();
        };
        stickerImg.src = stickerObj.src;
      });
    }
  }

  // Draw message and date exactly like editor
  if (stripMessage || showStripDate) {
    const textStartY = canvas.height - messageSpace + 20;
    const stripTextColor = getContrastingTextColor(frameStyle.background);

    // Message with Cedarville Cursive font
    if (stripMessage) {
      ctx.fillStyle = stripTextColor;
      ctx.font = '16px "Cedarville Cursive", cursive';
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const lines = stripMessage.split("\n");
      lines.forEach((line, i) => {
        if (line.trim()) {
          // Only draw non-empty lines
          ctx.fillText(line.trim(), canvas.width / 2, textStartY + i * 20);
        }
      });
    }

    // Date
    if (showStripDate) {
      ctx.fillStyle = stripTextColor;
      ctx.font = "12px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      const dateStr = new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      ctx.fillText(dateStr, canvas.width / 2, canvas.height - 20);
    }
  }

  return canvas.toDataURL("image/png");
};

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

  // Add this line right here:
  const canRetake = capturedImages.length > 0;

  // Add mounted state to prevent FOUC
  const [mounted, setMounted] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (step === "welcome") {
      setTimeout(() => setShowCard(true), 80);
    } else {
      setShowCard(false);
    }
  }, [step]);

  // Update the DraggableSVG positions for responsive design

  // Stagger SVGs after card animates in

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
  const handleRetake = (redirectToPhotobooth = false) => {
    // Trigger sleek refresh sweep animation
    setShowRefreshAnim(true);

    if (redirectToPhotobooth) {
      // If we're redirecting to photobooth, switch step after animation starts
      setTimeout(() => {
        setStep("photobooth");
      }, 480);

      // DELAY clearing content until after we've switched steps
      setTimeout(() => {
        setCapturedImages([]);
        setAnimatedPreviews([]);
        setPlacedStickers([]);
      }, 600); // Clear after step change
    } else {
      // Clear content immediately for non-redirect retakes
      setCapturedImages([]);
      setAnimatedPreviews([]);
      setPlacedStickers([]);
    }

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
      className={`min-h-screen w-full bg-gradient-to-br from-pink-300 via-blue-300 to-purple-300 ${
        step === "welcome"
          ? "flex items-center justify-center overflow-hidden"
          : "flex flex-col items-center justify-start"
      } py-0 px-0 relative`}
    >
      {/* Welcome Card: always render unless in photobooth */}
      {mounted && step !== "photobooth" && step !== "editor" && (
        <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:mt-12 lg:mt-16 mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 group">
            <img
              src="/images/croumatic.png"
              alt="Photobooth Logo"
              width={35}
              height={35}
              className={
                `sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] rounded-xl  object-contain transition-all duration-400 ease-out transform ` +
                ` group-hover:scale-105 ` +
                (showCard
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8")
              }
            />
            <h1
              className={
                `ciguatera font-bold text-5xl sm:text-6xl md:text-7xl lg:text-7xl text-black text-center drop-shadow-lg whitespace-nowrap transition-all duration-400 ease-out transform ` +
                ` group-hover:scale-105 ` +
                (showCard
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8")
              }
            >
              Croumatic
            </h1>
          </div>
          <h2
            className={
              `fredoka text-sm sm:text-base md:text-lg text-purple-700 text-center transition-all duration-400 ease-out transform px-2 ` +
              (showCard
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8")
            }
            style={{ opacity: showCard ? 0.8 : 0 }}
          >
            Capture it, remember it
          </h2>
          {step === "welcome" && (
            <button
              className={`start-btn ${
                showCard
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-8"
              }`}
              onClick={handleStart}
            >
              <div className="start-sign">
                <img src="/images/camera.png" alt="Camera" />
              </div>
              <div className="fredoka start-text text-black">Start</div>
            </button>
          )}
        </div>
      )}

      {/* Photobooth Layout */}
      {step === "photobooth" && (
        <>
          {/* Top: Title and Subtitle */}
          <div
            className={`w-full flex flex-col items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 mb-4 sm:mb-6 md:mb-8 transition-all duration-700 px-4 ${
              showPhotobooth
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 group">
              <img
                src="/images/croumatic.png"
                alt="Photobooth Logo"
                width={35}
                height={35}
                className="sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px] rounded-xl object-contain"
              />
              <h1 className="ciguatera font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-black text-center drop-shadow-lg">
                Croumatic
              </h1>
            </div>
            <h2
              className="fredoka text-xs sm:text-sm md:text-md text-center text-purple-700 mt-1 sm:mt-2"
              style={{ letterSpacing: 0.2 }}
            >
              Capture it, remember it
            </h2>
          </div>

          {/* Main: Responsive Layout */}
          <div className="flex flex-col xl:flex-row w-full max-w-6xl mx-auto my-4 sm:my-6 md:my-8 items-center xl:items-start justify-center xl:justify-between px-4 sm:px-6 md:px-8 xl:px-12 gap-6 xl:gap-0">
            {/* Camera Preview - Full width on tablets including iPad Pro, flex-1 on large desktop */}
            <div
              className={`w-full xl:flex-1 xl:mr-6 xl:pr-4 flex flex-col items-center xl:items-start justify-center order-1 xl:order-1 xl:-mt-8 transition-all duration-700 ${
                showPhotobooth
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className={`relative transition-all duration-700 ${
                  showPhotobooth
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  width: "min(90vw, 500px)",
                  height: "min(80vw, 450px)",
                  maxWidth: 500,
                  maxHeight: 450,
                  transitionDelay: "200ms",
                }}
              >
                <div
                  className="w-full h-full bg-white shadow-2xl flex flex-col items-center justify-start border border-gray-200"
                  style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" }}
                >
                  {/* Polaroid photo area */}
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
                            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg animate-pulse">
                              {countdown}
                            </span>
                          </div>
                        )}
                        {showCaptureEffect && (
                          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                            <div className="absolute inset-0 bg-white opacity-40 animate-capture-flash" />
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-400">
                        📷
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Images - Below camera on mobile/tablet including iPad Pro, hidden on large desktop */}
              <div
                className={`xl:hidden flex flex-col items-center justify-center mt-12 ml-4 md:mt-10 lg:mt-16 transition-all duration-700 w-full ${
                  showPhotobooth
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div
                  className={`grid ${getGridLayout(
                    settings.numberOfPhotos
                  )} w-full max-w-md justify-center`}
                >
                  {displayImages.map((src, idx) => {
                    const key = src + "-" + idx;
                    // Responsive sizing for preview images
                    const baseSize =
                      settings.numberOfPhotos === 6
                        ? "w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32 lg:w-44 lg:h-34"
                        : "w-36 h-28 sm:w-40 sm:h-32 md:w-48 md:h-36 lg:w-52 lg:h-38";

                    return (
                      <div
                        key={key}
                        className={
                          `relative bg-white flex items-center justify-center shadow-xl border-4 border-white ${baseSize} ` +
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

            {/* Right: Preview Images - Only shown on large desktop (xl+) */}
            <div
              className={`hidden xl:flex flex-1 flex-col items-center xl:items-end justify-center order-2 xl:order-2 xl:-mt-2 transition-all duration-700 w-full xl:w-auto ${
                showPhotobooth
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <div
                className={`grid ${getGridLayout(settings.numberOfPhotos)} ${
                  settings.numberOfPhotos === 6
                    ? "mt-0 sm:-mt-2 md:-mt-4 xl:-mt-6"
                    : "pt-2 sm:pt-4 md:pt-6"
                } xl:pl-12 w-full max-w-md xl:max-w-none justify-center xl:justify-start`}
              >
                {displayImages.map((src, idx) => {
                  const key = src + "-" + idx;
                  // Large desktop sizing for preview images
                  const baseSize =
                    settings.numberOfPhotos === 6
                      ? "xl:w-48 xl:h-36"
                      : "xl:w-56 xl:h-40";

                  return (
                    <div
                      key={key}
                      className={
                        `relative bg-white flex items-center justify-center shadow-xl border-4 border-white ${baseSize} ` +
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

          {/* Mini Navbar - Make it responsive */}
          <div className="w-full flex justify-center mt-4 sm:mt-6 md:mt-8">
            <Navbar
              showPhotobooth={showPhotobooth}
              onSettingsOpen={handleSettingsOpen}
              onCapture={handleCapture}
              isCapturing={isCapturing}
              canRetake={canRetake}
              onRetake={() => handleRetake(false)}
              onEdit={handlePrint}
              isEditorStep={false}
            />
          </div>
        </>
      )}
      {/* Editor Step: Photo Strip Editor */}
      {step === "editor" && (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center mt-8 sm:mt-10 lg:mt-12 mb-6 sm:mb-8 transition-all duration-700">
          {/* Logo and Title */}
          <div
            className={
              "flex flex-col items-center gap-2 mb-4" +
              (showEditorAnim ? " editor-entrance" : "")
            }
            style={{ animationDelay: showEditorAnim ? "60ms" : undefined }}
          >
            <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4">
              <img
                src="/images/croumatic.png"
                alt="Photobooth Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl shadow-md object-contain"
              />
              <h1 className="ciguatera font-bold text-3xl sm:text-4xl lg:text-5xl text-black text-center drop-shadow-lg">
                Croumatic
              </h1>
            </div>
            <h2
              className="text-sm sm:text-md font-medium text-center text-purple-700"
              style={{ letterSpacing: 0.2 }}
            >
              Capture it, remember it
            </h2>
          </div>

          {/* Main Editor Layout - Responsive */}
          <div className="flex flex-col xl:flex-row w-full items-center xl:items-start justify-center xl:justify-end px-4 sm:px-8 xl:px-12 mt-4 sm:mt-6 xl:mt-8">
            {/* Left: Photo Strip - Always centered on mobile/tablet, left-aligned on desktop */}
            <div
              className={
                "flex flex-col items-center justify-center xl:mr-60 mb-8 xl:mb-0 order-1 xl:order-1" +
                (showEditorAnim ? " editor-entrance" : "")
              }
              style={{
                minWidth: 320,
                animationDelay: showEditorAnim ? "120ms" : undefined,
              }}
            >
              <div
                ref={stripRootRef}
                className={`shadow-2xl flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 relative w-[14rem] sm:w-[15rem] lg:w-[16rem]`}
                style={{
                  minHeight: 480,
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
                    className="flex flex-col items-center photostrip-container w-48 sm:w-52 lg:w-56"
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
                      let imgClass = `object-cover w-48 sm:w-52 lg:w-56 h-32 sm:h-36 lg:h-40 ${
                        idx !== capturedImages.length - 1 ? "mb-3 sm:mb-4" : ""
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
                          borderRadius: 4,
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

                    {/* Render stickers placed on the strip itself */}
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

                {/* Message Space and Date */}
                {capturedImages.length > 0 && (
                  <div className="w-full mt-6 text-center select-none">
                    <div className="w-full pt-2 mb-2 px-3 flex justify-center">
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

            {/* Right: Cards - Stacked vertically on mobile/tablet, right-aligned on desktop */}
            <div
              className={
                "flex flex-col items-center xl:items-start gap-4 sm:gap-6 xl:-mr-44 order-2 xl:order-2 w-full xl:w-auto max-w-none" +
                (showEditorAnim ? " editor-entrance" : "")
              }
              style={{ animationDelay: showEditorAnim ? "160ms" : undefined }}
            >
              {/* Top row: Frames and Filters - Stacked on mobile/tablet, side by side on desktop */}
              <div className="flex flex-col xl:flex-row items-stretch gap-4 sm:gap-6 xl:gap-8 w-full xl:w-auto">
                <div
                  className={
                    "bg-white shadow-lg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[140px] w-full xl:min-w-[280px] 2xl:min-w-[320px]" +
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
                    "bg-white shadow-lg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[140px] w-full xl:min-w-[280px] 2xl:min-w-[320px]" +
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

              {/* Bottom row: Stickers and Message - Stacked on mobile/tablet, side by side on desktop */}
              <div className="flex flex-col xl:flex-row items-stretch gap-4 sm:gap-6 xl:gap-8 w-full xl:w-auto">
                <div
                  className={
                    "bg-white shadow-lg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[360px] w-full xl:min-w-[280px] 2xl:min-w-[320px]" +
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
                    "bg-white shadow-lg flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 min-h-[360px] w-full xl:min-w-[280px] 2xl:min-w-[320px]" +
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
            showEditorAnim={showEditorAnim}
            onSettingsOpen={handleSettingsOpen}
            onDownload={async () => {
              // ... existing download logic
            }}
            onPrint={async () => {
              // ... existing print logic
            }}
            onCapture={handleCapture}
            isCapturing={isCapturing}
            canRetake={canRetake}
            onRetake={() => handleRetake(true)}
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
        /* Responsive SVG scaling */
        @media (max-width: 640px) {
          .draggable-svg {
            font-size: 0.6em; /* Smaller on mobile */
            transform-origin: center;
          }

          /* Reduce animation intensity on mobile */
          .svg-entrance {
            transform: scale(0.8) translateY(16px);
          }

          .svg-entrance-in {
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 480px) {
          .draggable-svg {
            font-size: 0.5em; /* Even smaller on very small screens */
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .draggable-svg {
            font-size: 0.8em; /* Medium size on tablets */
          }
        }

        /* Ensure SVGs don't interfere with touch interactions on mobile */
        @media (max-width: 768px) {
          .draggable-svg {
            pointer-events: auto;
            touch-action: manipulation;
          }

          /* Reduce trail effect intensity on mobile for better performance */
          .draggable-svg-trail {
            opacity: 0.3;
            filter: blur(1px);
          }
        }

        /* Responsive font adjustments for mobile */
        @media (max-width: 640px) {
          .lilita-one {
            letter-spacing: -0.02em;
          }
        }

        /* Ensure proper spacing on very small screens */
        @media (max-width: 480px) {
          .lilita-one {
            letter-spacing: -0.03em;
          }
        }

        /* Improve touch targets on mobile */
        @media (max-width: 768px) {
          button {
            min-height: 44px; /* Apple's recommended touch target size */
          }
        }

        /* Responsive SVG sizes */
        @media (max-width: 640px) {
          .draggable-svg {
            font-size: 0.8em;
          }
        }

        @media (max-width: 480px) {
          .draggable-svg {
            font-size: 0.7em;
          }
        }

        /* Existing animations and styles remain the same */
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
