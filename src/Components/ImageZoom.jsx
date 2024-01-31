import React, { useState } from "react";
import "../Styles/ImageZoom.scss";

const ImageZoom = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setHoverPosition({ x, y });
  };

  return (
    <>
      <div className="image-container" onMouseMove={handleMouseMove}>
        <img
          src="/images/laptop.jpg"
          alt="zooming images"
          className="zoom-image"
        />
        <div
          className="zoom-overlay"
          style={{
            backgroundImage: `url('/images/laptop.jpg')`,
            backgroundPosition: `${hoverPosition.x * 100}% ${hoverPosition.y * 100}%`,
          }}
        ></div>
      </div>
    </>
  );
};

export default ImageZoom;
