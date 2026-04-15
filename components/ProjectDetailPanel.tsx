"use client";

import Image from "next/image";
import { Project } from "@/types/project";
import { PROJECT_COLORS } from "@/data/colors";
import { getImageDimensions } from "@/utils/imageHelper";
import { withBase } from "@/utils/basePath";

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

          {/* Title */}
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            {project.title}
          </h2>

          {/* The brief */}
          <p style={SECTION_LABEL}>The brief</p>
          {project.brief.map((para, i) => (
            <p key={i} style={{ ...SECTION_BODY, marginBottom: i < project.brief.length - 1 ? "1em" : "2rem" }}>{para}</p>
          ))}

          {/* The thinking */}
          <p style={SECTION_LABEL}>The thinking</p>
          {project.thinking.map((para, i) => (
            <p key={i} style={{ ...SECTION_BODY, marginBottom: i < project.thinking.length - 1 ? "1em" : "2rem" }}>{para}</p>
          ))}

          {/* The outcome */}
          <p style={SECTION_LABEL}>The outcome</p>
          {project.outcome.map((para, i) => (
            <p key={i} style={{ ...SECTION_BODY, marginBottom: i < project.outcome.length - 1 ? "1em" : "3rem" }}>{para}</p>
          ))}

          {/* Images stacked at natural proportions */}
          {[project.image, ...project.galleryImages].map((img, i) => {
            const { width, height } = getImageDimensions(img);
            return (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <Image
                  src={withBase(img)}
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
