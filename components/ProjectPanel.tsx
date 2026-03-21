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

// Gap between image and panel edges on expanded panels
const IMG_INSET = 10;

// 12-column grid: expanded = 7 cols (1 strip + 6 image), collapsed = 1 col each.
// Right column = 50vw. One column = 50vw / 12.
const STRIP_W = "calc(50vw / 12)";

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
  const borderRight = isLast ? "none" : "1px solid rgba(255,255,255,0.15)";

  if (isMobile) {
    return (
      <motion.div
        layout
        animate={{ flexGrow: isExpanded ? 7 : 1 }}
        transition={springTransition}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          position: "relative",
          backgroundColor: "#111",
          height: "100svh",
          width: "80vw",
          flexShrink: 0,
          scrollSnapAlign: "start",
          borderRight,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Image — always rendered, shown only when expanded */}
        <motion.div
          layoutId={project.id}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="80vw"
            priority={isExpanded}
          />
        </motion.div>

        {/* Title strip — bottom-centered */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "14px",
              fontWeight: 500,
              color: titleColor,
              transition: "color 0.2s ease",
            }}
          >
            {project.title}
          </span>
        </div>
      </motion.div>
    );
  }

  // ── Desktop layout ───────────────────────────────────────────────────────
  return (
    <motion.div
      layout
      animate={{ flexGrow: isExpanded ? 7 : 1 }}
      transition={springTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        height: "100%",
        backgroundColor: "#111",
        display: "flex",
        minWidth: 0,
        cursor: "pointer",
        overflow: "hidden",
        borderRight,
      }}
    >
      {/* ── Text strip ── fixed width = one collapsed panel ── */}
      <div
        style={{
          width: STRIP_W,
          flexShrink: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Year — top, vertical, only when expanded */}
        {isExpanded && (
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "11px",
              color: "#a0a0a0",
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}
          >
            {project.year}
          </span>
        )}

        {/* Pushes title to bottom */}
        <div style={{ flex: 1 }} />

        {/* Title — bottom, vertical, always shown */}
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "15px",
            fontWeight: 500,
            color: titleColor,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            transition: "color 0.2s ease",
            flexShrink: 0,
          }}
        >
          {project.title}
        </span>
      </div>

      {/* ── Image ── always in DOM, opacity-fades in/out ── */}
      <motion.div
        layoutId={project.id}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          top: IMG_INSET,
          right: IMG_INSET,
          bottom: IMG_INSET,
          left: STRIP_W,
          borderRadius: 10,
          overflow: "hidden",
          pointerEvents: isExpanded ? "auto" : "none",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 40vw"
          priority={isExpanded}
        />
      </motion.div>
    </motion.div>
  );
}
