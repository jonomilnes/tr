"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

const BORDER = "1px solid rgba(255,255,255,0.50)";

export default function ProjectDetailPanel({
  project,
  onClose,
}: ProjectDetailPanelProps) {
  const [activeImage, setActiveImage] = useState(project.image);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImage(project.image);
  }, [project.image]);

  return (
    <motion.div
      key={project.id}
      initial={{ flexGrow: 0 }}
      animate={{ flexGrow: 12 }}
      exit={{ flexGrow: 0 }}
      transition={springTransition}
      style={{
        flexBasis: 0,
        flexShrink: 0,
        height: "100%",
        overflow: "hidden",
        borderLeft: BORDER,
        position: "relative",
      }}
    >
      {/* Scrollable inner */}
      <div
        className="scrollbar-hide"
        style={{
          height: "100%",
          overflowY: "auto",
          padding: "1.5rem",
        }}
      >
        {/* Close button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#666",
              fontSize: "20px",
              lineHeight: 1,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(1.25rem, 2vw, 2rem)",
            fontWeight: 600,
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          {project.title}
        </h2>

        {/* Year · Role */}
        <p
          className="font-mono"
          style={{ fontSize: "0.75rem", color: "#666", marginBottom: "1.5rem" }}
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
            sizes="25vw"
            priority
          />
        </div>

        {/* Gallery thumbnails */}
        <div
          className="scrollbar-hide"
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            marginBottom: "2rem",
          }}
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
                outline:
                  activeImage === img
                    ? "2px solid #c9a96e"
                    : "2px solid transparent",
              }}
            >
              <Image
                src={img}
                alt={`${project.title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* About */}
        <h3
          style={{
            fontSize: "0.7rem",
            fontWeight: 500,
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.75rem",
          }}
        >
          About the project
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#a0a0a0",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          {project.body}
        </p>

        {/* Definition list */}
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
                  fontWeight: 500,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.2rem",
                }}
              >
                {label}
              </dt>
              <dd style={{ fontSize: "0.9rem", color: "#f0f0f0" }}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
}
