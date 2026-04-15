"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { PROJECT_COLORS } from "@/data/colors";

interface ProjectPanelProps {
  project: Project;
  colorIndex: number;
  isExpanded: boolean;
  isLast: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

// One column = 100vw / 24
const STRIP_W = "calc(50vw / 12)";

export default function ProjectPanel({
  project,
  colorIndex,
  isExpanded,
  onHover,
  onLeave,
  onClick,
}: ProjectPanelProps) {
  const [hovered, setHovered] = useState(false);
  const colors = PROJECT_COLORS[colorIndex] ?? PROJECT_COLORS[0];

  const handleMouseEnter = () => { setHovered(true); onHover(); };
  const handleMouseLeave = () => { setHovered(false); onLeave(); };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexGrow: isExpanded ? 7 : 1,
        flexBasis: 0,
        minWidth: 0,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Coloured text strip */}
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
          backgroundColor: hovered ? colors.hover : colors.bg,
          transition: "background-color 0.15s ease",
        }}
      >
        {isExpanded && (
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "1rem",
              color: colors.text,
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
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
            color: colors.text,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {project.title}
        </span>
      </div>

      {/* Image — fills panel right of strip, shown only when expanded */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: STRIP_W,
          overflow: "hidden",
          opacity: isExpanded ? 1 : 0,
          pointerEvents: isExpanded ? "auto" : "none",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="40vw"
          priority={isExpanded}
        />
      </div>
    </div>
  );
}
