"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { PROJECT_COLORS } from "@/data/colors";

interface ProjectDetailPanelProps {
  project: Project;
  colorIndex: number;
  isActive: boolean;
}

const INNER_PADDING = "calc(3 * 100vw / 24)";

export default function ProjectDetailPanel({
  project,
  colorIndex,
  isActive,
}: ProjectDetailPanelProps) {
  const [activeImage, setActiveImage] = useState(project.image);
  const colors = PROJECT_COLORS[colorIndex] ?? PROJECT_COLORS[0];

  useEffect(() => {
    setActiveImage(project.image);
  }, [project.image]);

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
        <h2
          style={{
            fontSize: "clamp(1.25rem, 2vw, 2rem)",
            fontWeight: 600,
            color: colors.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          {project.title}
        </h2>

        <p
          className="font-mono"
          style={{ fontSize: "0.75rem", color: colors.text, opacity: 0.6, marginBottom: "1.5rem" }}
        >
          {project.year}&nbsp;·&nbsp;{project.role}
        </p>

        {/* Hero image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 2",
            overflow: "hidden",
            marginBottom: "0.75rem",
          }}
        >
          <Image
            src={activeImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="45vw"
            priority={isActive}
          />
        </div>

        {/* Gallery thumbnails */}
        <div
          className="scrollbar-hide"
          style={{ display: "flex", gap: "0.5rem", overflowX: "auto", marginBottom: "2rem" }}
        >
          {[project.image, ...project.galleryImages].map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              style={{
                position: "relative",
                flexShrink: 0,
                width: "80px",
                height: "56px",
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
                background: "none",
                border: "none",
                outline: activeImage === img ? `2px solid ${colors.text}` : "2px solid transparent",
              }}
            >
              <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>

        <h3
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: colors.text,
            opacity: 0.6,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.75rem",
          }}
        >
          About the project
        </h3>
        <p style={{ fontSize: "0.9rem", color: colors.text, lineHeight: 1.7, marginBottom: "2rem" }}>
          {project.body}
        </p>

        <dl>
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
              <dd style={{ fontSize: "0.9rem", color: colors.text }}>{value}</dd>
            </div>
          ))}
        </dl>
        </div>
      </div>
    </div>
  );
}
