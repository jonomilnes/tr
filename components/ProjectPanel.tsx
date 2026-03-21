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
  contentVisible?: boolean;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 220,
  damping: 35,
};

// One column = 100vw / 24 = 50vw / 12
const STRIP_W = "calc(50vw / 12)";
const BORDER = "1px solid rgba(255,255,255,0.50)";

export default function ProjectPanel({
  project,
  isExpanded,
  onHover,
  onLeave,
  onClick,
  isMobile = false,
  contentVisible = true,
}: ProjectPanelProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => { setHovered(true); onHover(); };
  const handleMouseLeave = () => { setHovered(false); onLeave(); };

  const titleColor = isExpanded ? "#f0f0f0" : hovered ? "#c9a96e" : "#888";

  if (isMobile) {
    return (
      <motion.div
        animate={{ flexGrow: isExpanded ? 7 : 1 }}
        transition={springTransition}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          position: "relative",
          height: "100svh",
          width: "80vw",
          flexShrink: 0,
          scrollSnapAlign: "start",
          borderLeft: BORDER,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
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
              fontSize: "1rem",
              fontWeight: 400,
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

  // ── Desktop ──────────────────────────────────────────────────────────────
  return (
    <motion.div
      animate={{ flexGrow: isExpanded ? 7 : 1 }}
      transition={springTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexBasis: 0,
        minWidth: 0,
        cursor: "pointer",
        overflow: "hidden",
        borderLeft: BORDER,
      }}
    >
      {/* Text strip — border/bg always visible, text fades with contentVisible */}
      <div
        style={{
          width: STRIP_W,
          flexShrink: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        {isExpanded && (
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "1rem",
              color: "#a0a0a0",
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
              opacity: contentVisible ? 1 : 0,
              transition: "opacity 0.12s ease",
            }}
          >
            {project.year}
          </span>
        )}
        <div style={{ flex: 1 }} />
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1rem",
            fontWeight: 400,
            color: titleColor,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            transition: "color 0.2s ease, opacity 0.12s ease",
            flexShrink: 0,
            opacity: contentVisible ? 1 : 0,
          }}
        >
          {project.title}
        </span>
      </div>

      {/* Image — always in DOM, opacity 0 when collapsed */}
      <motion.div
        layoutId={project.id}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: STRIP_W,
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
