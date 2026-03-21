"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectPanelProps {
  project: Project;
  isExpanded: boolean;
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

export default function ProjectPanel({
  project,
  isExpanded,
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

  return (
    <motion.div
      layout
      animate={{ flexGrow: isExpanded ? 4 : 1 }}
      transition={springTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "#111",
        height: isMobile ? "100svh" : "100%",
        width: isMobile ? "80vw" : undefined,
        flexShrink: isMobile ? 0 : undefined,
        scrollSnapAlign: isMobile ? "start" : undefined,
        minWidth: isMobile ? undefined : 0,
      }}
    >
      {/* Base background image (blurred when collapsed, full when expanded) */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            filter: isExpanded ? "none" : "blur(8px)",
            opacity: isExpanded ? 1 : 0.15,
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
          sizes="(max-width: 768px) 80vw, 50vw"
          priority={isExpanded}
        />
      </div>

      {/* Shared layoutId image for overlay morphing — only when expanded */}
      {isExpanded && (
        <motion.div
          layoutId={project.id}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 50vw"
            priority
          />
        </motion.div>
      )}

      {/* Gradient overlay — expanded only */}
      {isExpanded && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
            zIndex: 2,
          }}
        />
      )}

      {/* Year — top right on expanded */}
      {isExpanded && (
        <div
          className="absolute top-6 right-6 font-mono"
          style={{ fontSize: "13px", color: "#a0a0a0", zIndex: 3 }}
        >
          {project.year}
        </div>
      )}

      {/* Expanded: title + description at bottom left */}
      {isExpanded && (
        <div className="absolute bottom-8 left-8 right-8" style={{ zIndex: 3 }}>
          <h2
            className="font-serif text-white leading-tight mb-1"
            style={{ fontSize: "36px" }}
          >
            {project.title}
          </h2>
          <p className="font-inter" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
            {project.description}
          </p>
        </div>
      )}

      {/* Collapsed: vertically rotated title */}
      {!isExpanded && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 3 }}
        >
          <span
            className="font-inter uppercase tracking-widest select-none whitespace-nowrap"
            style={{
              fontSize: "11px",
              color: hovered ? "#c9a96e" : "#666",
              transform: "rotate(90deg)",
              transition: "color 0.2s ease",
            }}
          >
            {project.title}
          </span>
        </div>
      )}
    </motion.div>
  );
}
