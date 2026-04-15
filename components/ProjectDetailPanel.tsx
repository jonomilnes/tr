"use client";

import Image from "next/image";
import { Project } from "@/types/project";
import { PROJECT_COLORS } from "@/data/colors";
import { getImageDimensions } from "@/utils/imageHelper";

interface ProjectDetailPanelProps {
  project: Project;
  colorIndex: number;
  isActive: boolean;
}

const INNER_PADDING = "calc(3 * 100vw / 24)";

const SECTION_LABEL: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  opacity: 0.45,
  marginBottom: "0.4rem",
};

const SECTION_BODY: React.CSSProperties = {
  fontSize: "0.9rem",
  lineHeight: 1.75,
  marginBottom: "2rem",
};

export default function ProjectDetailPanel({
  project,
  colorIndex,
  isActive,
}: ProjectDetailPanelProps) {
  const colors = PROJECT_COLORS[colorIndex] ?? PROJECT_COLORS[0];

  return (
    <div
      style={{
        flexGrow: isActive ? 17 : 0,
        flexBasis: 0,
        flexShrink: 0,
        height: "100%",
        overflow: "hidden",
        backgroundColor: isActive ? colors.bg : "transparent",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div
        className="scrollbar-hide"
        style={{
          height: "100%",
          overflowY: "auto",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          paddingLeft: INNER_PADDING,
          paddingRight: INNER_PADDING,
        }}
      >
        <div className="max-w-prose mx-auto w-full" style={{ color: colors.text }}>

          {/* The brief */}
          <p style={SECTION_LABEL}>The brief</p>
          <p style={SECTION_BODY}>{project.brief}</p>

          {/* The thinking */}
          <p style={SECTION_LABEL}>The thinking</p>
          <p style={SECTION_BODY}>{project.thinking}</p>

          {/* The outcome */}
          <p style={SECTION_LABEL}>The outcome</p>
          <p style={{ ...SECTION_BODY, marginBottom: "3rem" }}>{project.outcome}</p>

          {/* Images stacked at natural proportions */}
          {[project.image, ...project.galleryImages].map((img, i) => {
            const { width, height } = getImageDimensions(img);
            return (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <Image
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  width={width}
                  height={height}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority={isActive && i === 0}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
