"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectPanelProps {
  project: Project;
  isExpanded: boolean;
  isLast: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isMobile?: boolean;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

// Padding around the inset image
const IMG_INSET = 10;
// Width of the left text gutter (year + title live here)
const GUTTER = 44;

export default function ProjectPanel({
  project,
  isExpanded,
  isLast,
  onHover,
  onLeave,
  onClick,
  isMobile = false,
}: ProjectPanelProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    onHover();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    onLeave();
  };

  const titleColor = isExpanded ? "#f0f0f0" : hovered ? "#c9a96e" : "#888";

  return (
    <motion.div
      layout
      animate={{ flexGrow: isExpanded ? 4 : 1 }}
      transition={springTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        backgroundColor: "#111",
        height: isMobile ? "100svh" : "100%",
        width: isMobile ? "80vw" : undefined,
        flexShrink: isMobile ? 0 : undefined,
        scrollSnapAlign: isMobile ? "start" : undefined,
        minWidth: isMobile ? undefined : 0,
        // White separator on the right of every panel except the last
        borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {isExpanded ? (
        <>
          {/* Inset image with rounded corners — shifted right to leave text gutter */}
          <motion.div
            layoutId={project.id}
            className="absolute overflow-hidden"
            style={{
              top: IMG_INSET,
              right: IMG_INSET,
              bottom: IMG_INSET,
              left: GUTTER,
              borderRadius: 10,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 40vw"
              priority
            />
          </motion.div>

          {/* Year — top of gutter, horizontal */}
          <div
            className="absolute"
            style={{
              top: IMG_INSET + 4,
              left: 12,
              fontSize: "11px",
              color: "#a0a0a0",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.04em",
            }}
          >
            {project.year}
          </div>

          {/* Title — bottom of gutter, rotated to read bottom→top */}
          <div
            className="absolute"
            style={{
              bottom: IMG_INSET + 4,
              left: 12,
              fontSize: "13px",
              fontWeight: 500,
              color: titleColor,
              whiteSpace: "nowrap",
              transformOrigin: "bottom left",
              transform: "rotate(-90deg)",
              letterSpacing: "0.01em",
            }}
          >
            {project.title}
          </div>
        </>
      ) : (
        <>
          {/* Collapsed: no image. Title rotated, anchored to bottom */}
          <div
            className="absolute"
            style={{
              bottom: IMG_INSET + 4,
              left: 12,
              fontSize: "13px",
              fontWeight: 500,
              color: titleColor,
              whiteSpace: "nowrap",
              transformOrigin: "bottom left",
              transform: "rotate(-90deg)",
              letterSpacing: "0.01em",
              transition: "color 0.2s ease",
            }}
          >
            {project.title}
          </div>
        </>
      )}
    </motion.div>
  );
}
