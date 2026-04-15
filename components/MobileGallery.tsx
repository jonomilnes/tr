"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { ProjectColor, PROJECT_COLORS } from "@/data/colors";
import { getImageDimensions } from "@/utils/imageHelper";
import { withBase } from "@/utils/basePath";

// Height of the sticky bio strip at the top of the mobile page
const BIO_STRIP_H = 60;
const TITLE_BAR_H = 52;

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  opacity: 0.45,
  marginBottom: "0.4rem",
};

const BODY_STYLE: React.CSSProperties = {
  fontSize: "0.95rem",
  lineHeight: 1.75,
};

// ── Single row extracted so it can use useRef / useEffect ────────────────────
function MobileRow({
  project,
  colors,
  isSelected,
  onOpen,
  onClose,
}: {
  project: Project;
  colors: ProjectColor;
  isSelected: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  // When this row becomes selected, scroll its title bar to just below the
  // sticky bio strip — so the article always starts at the top.
  useEffect(() => {
    if (!isSelected || !rowRef.current) return;
    const top =
      rowRef.current.getBoundingClientRect().top +
      window.scrollY -
      BIO_STRIP_H;
    window.scrollTo({ top, behavior: "instant" });
  }, [isSelected]);

  return (
    <div ref={rowRef}>
      {/* Title bar */}
      <div
        onClick={() => (isSelected ? onClose() : onOpen())}
        style={{
          backgroundColor: colors.bg,
          height: TITLE_BAR_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: isSelected ? 500 : 400,
            color: colors.text,
          }}
        >
          {project.title}
        </span>
        <span
          style={{
            fontSize: "1rem",
            color: colors.text,
            opacity: 0.6,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Detail — instant open/close, no animation */}
      {isSelected && (
        <div style={{ backgroundColor: colors.bg }}>
          <div style={{ padding: "1rem", color: colors.text }}>
            {/* The brief */}
            <p style={LABEL_STYLE}>The brief</p>
            {project.brief.map((para, i) => (
              <p
                key={i}
                style={{
                  ...BODY_STYLE,
                  marginBottom:
                    i < project.brief.length - 1 ? "1em" : "1.5rem",
                }}
              >
                {para}
              </p>
            ))}

            {/* The thinking */}
            <p style={LABEL_STYLE}>The thinking</p>
            {project.thinking.map((para, i) => (
              <p
                key={i}
                style={{
                  ...BODY_STYLE,
                  marginBottom:
                    i < project.thinking.length - 1 ? "1em" : "1.5rem",
                }}
              >
                {para}
              </p>
            ))}

            {/* The outcome */}
            <p style={LABEL_STYLE}>The outcome</p>
            {project.outcome.map((para, i) => (
              <p
                key={i}
                style={{
                  ...BODY_STYLE,
                  marginBottom:
                    i < project.outcome.length - 1 ? "1em" : "2rem",
                }}
              >
                {para}
              </p>
            ))}

            {/* Images */}
            {[project.image, ...project.galleryImages].map((img, idx) => {
              const { width, height } = getImageDimensions(img);
              return (
                <div key={idx} style={{ marginBottom: "0.75rem" }}>
                  <Image
                    src={withBase(img)}
                    alt={`${project.title} ${idx + 1}`}
                    width={width}
                    height={height}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    sizes="100vw"
                    priority={idx === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Gallery ──────────────────────────────────────────────────────────────────
interface MobileGalleryProps {
  projects: Project[];
  selectedProject: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
}

export default function MobileGallery({
  projects,
  selectedProject,
  onOpen,
  onClose,
}: MobileGalleryProps) {
  return (
    <div className="flex flex-col w-full">
      {projects.map((project, i) => (
        <MobileRow
          key={project.id}
          project={project}
          colors={PROJECT_COLORS[i] ?? PROJECT_COLORS[0]}
          isSelected={selectedProject?.id === project.id}
          onOpen={() => onOpen(project)}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
