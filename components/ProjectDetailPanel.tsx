"use client";

import Image from "next/image";
import { Project } from "@/types/project";
import { PROJECT_COLORS } from "@/data/colors";

interface ProjectDetailPanelProps {
  project: Project;
  colorIndex: number;
  isActive: boolean;
}

const INNER_PADDING = "calc(3 * 100vw / 24)";

import { getImageDimensions } from "@/utils/imageHelper";

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
        <div className="max-w-prose mx-auto w-full">
          {/* Title */}
          <h2
            style={{
              fontSize: "clamp(1.25rem, 2vw, 2rem)",
              fontWeight: 600,
              color: colors.text,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "2rem",
            }}
          >
            {project.title}
          </h2>

          {/* Body */}
          <p
            style={{
              fontSize: "0.9rem",
              color: colors.text,
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            {project.body}
          </p>

          {/* Definition list */}
          <dl style={{ marginBottom: "3rem" }}>
            {[
              { label: "Role", value: project.role },
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Deliverables", value: project.deliverables },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: "1rem" }}>
                <dt
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: colors.text,
                    opacity: 0.6,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {label}
                </dt>
                <dd style={{ fontSize: "0.9rem", color: colors.text }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

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
