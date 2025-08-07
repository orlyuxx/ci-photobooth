import React, { useRef } from "react";

export default function Stickers({
  selected = null,
  onChange = () => {},
  className = "",
  onUndo = () => {},
  onStickersInit = undefined,
}) {
  const stickers = [
    { id: "laugh", src: "/stickers/laugh.png", name: "Laugh" },
    { id: "cute", src: "/stickers/cute.png", name: "Cute" },
    { id: "heart", src: "/stickers/heart.png", name: "Heart" },
    {
      id: "butterflies",
      src: "/stickers/butterflies.png",
      name: "Butterflies",
    },
    { id: "cloud", src: "/stickers/cloud.png", name: "Cloud" },
    { id: "panda", src: "/stickers/panda.png", name: "Panda" },
    { id: "love2", src: "/stickers/love2.png", name: "Love 2" },
    { id: "love1", src: "/stickers/love1.png", name: "Love 1" },
    { id: "hi", src: "/stickers/hi.png", name: "Hi" },
    { id: "hearts", src: "/stickers/hearts.png", name: "Hearts" },
    { id: "love-webp", src: "/stickers/love.webp", name: "Love (webp)" },
    { id: "aww-webp", src: "/stickers/aww.webp", name: "Aww (webp)" },
    { id: "cat-webp", src: "/stickers/cat.webp", name: "Cat (webp)" },
    { id: "love", src: "/stickers/love.png", name: "Love" },
    { id: "smiling", src: "/stickers/smiling.png", name: "Smiling" },
    { id: "bow", src: "/stickers/bow.png", name: "Bow" },
    { id: "cat", src: "/stickers/cat.png", name: "Cat" },
    { id: "hedgehog", src: "/stickers/hedgehog.png", name: "Hedgehog" },
    { id: "undo", src: "/stickers/undo.png", name: "Undo" },
  ];

  // Call onStickersInit with the stickers array on mount
  React.useEffect(() => {
    if (typeof onStickersInit === "function") {
      onStickersInit(stickers);
    }
  }, []);

  // Refs for each button
  const buttonRefs = useRef({});

  const handleStickerClick = (stickerId) => {
    if (stickerId === "undo") {
      onUndo();
      // Blur the undo button so it can be clicked again immediately
      if (buttonRefs.current[stickerId]) {
        buttonRefs.current[stickerId].blur();
      }
    } else {
      onChange(selected === stickerId ? null : stickerId);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-md font-bold text-black -mt-4 mb-6 text-center">
        Stickers
      </span>
      <div className="grid grid-cols-4 gap-2 w-full max-w-xs place-items-center">
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            ref={(el) => (buttonRefs.current[sticker.id] = el)}
            className={`w-10 h-10 p-1.5 transition-all hover:cursor-pointer rounded-lg flex items-center justify-center ${
              selected === sticker.id
                ? "bg-gray-200"
                : "bg-transparent hover:bg-gray-200"
            }`}
            onClick={() => handleStickerClick(sticker.id)}
            title={sticker.name}
            type="button"
          >
            <img
              src={sticker.src}
              alt={sticker.name}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
