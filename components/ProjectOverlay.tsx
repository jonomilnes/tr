"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectOverlayProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectOverlay({
  project,
  onClose,
}: ProjectOverlayProps) {
  const [activeImage, setActiveImage] = useState<string>(project.image);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImage(project.image);
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] flex items-center justify-center transition-colors duration-200"
        style={{
          width: "48px",
          height: "48px",
          color: "#666",
          fontSize: "24px",
          lineHeight: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "#f0f0f0")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "#666")
        }
        aria-label="Close overlay"
      >
        ×
      </button>

      <div
        className="px-6 py-8 md:px-16 md:py-12 max-w-screen-xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10">
          <h1
            className="font-serif text-text-primary leading-none mb-3"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            {project.title}
          </h1>
          <p
            className="font-mono text-text-subtle"
            style={{ fontSize: "13px" }}
          >
            {project.year}&nbsp;·&nbsp;{project.role}
          </p>
        </div>

        {/* Hero image with layoutId for morphing */}
        <motion.div
          layoutId={project.id}
          className="relative w-full rounded-lg overflow-hidden mb-6"
          style={{ maxHeight: "60vh", height: "60vh" }}
        >
          <Image
            src={activeImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </motion.div>

        {/* Gallery thumbnails */}
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide mb-12"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {[project.image, ...project.galleryImages].map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className="relative flex-shrink-0 rounded-md overflow-hidden"
              style={{
                width: "280px",
                height: "200px",
                scrollSnapAlign: "start",
                outline:
                  activeImage === img
                    ? "2px solid #c9a96e"
                    : "2px solid transparent",
                cursor: "pointer",
                padding: 0,
                background: "none",
                border: "none",
              }}
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${i + 1}`}
                fill
                className="object-cover"
                sizes="280px"
              />
            </button>
          ))}
        </div>

        {/* Text content: two-column on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left: body */}
          <div className="md:col-span-3">
            <h2
              className="font-inter uppercase tracking-widest text-text-subtle mb-4"
              style={{ fontSize: "13px" }}
            >
              About the project
            </h2>
            <p
              className="font-inter text-text-muted"
              style={{ fontSize: "17px", lineHeight: "1.8" }}
            >
              {project.body}
            </p>
          </div>

          {/* Right: definition list */}
          <div className="md:col-span-2">
            <dl>
              {[
                { label: "Role", value: project.role },
                { label: "Client", value: project.client },
                { label: "Year", value: project.year },
                { label: "Deliverables", value: project.deliverables },
              ].map(({ label, value }) => (
                <div key={label} className="mb-4">
                  <dt
                    className="font-inter uppercase tracking-widest text-text-subtle"
                    style={{ fontSize: "12px" }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="font-inter text-text-primary"
                    style={{ fontSize: "16px" }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
