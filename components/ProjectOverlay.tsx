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

  // Detect mobile on mount (component only renders after a user interaction
  // so there is no SSR/hydration concern here)
  const [isMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setActiveImage(project.image);
  }, [project]);

  // Mobile: slide up from bottom. Desktop: appear instantly, fade out on close.
  const motionProps = isMobile
    ? {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring" as const, stiffness: 220, damping: 35 },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      };

  return (
    <motion.div
      {...motionProps}
      className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide md:hidden"
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
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
        aria-label="Close overlay"
      >
        ×
      </button>

      <div className="px-6 py-8 md:px-16 md:py-12 max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-text-primary leading-none mb-3 font-semibold"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>
          <p
            className="text-text-subtle font-mono"
            style={{ fontSize: "13px" }}
          >
            {project.year}&nbsp;·&nbsp;{project.role}
          </p>
        </div>

        {/* Hero image */}
        <div
          className="relative w-full overflow-hidden mb-6"
          style={{ maxHeight: "60vh", height: "60vh", borderRadius: "10px" }}
        >
          <Image
            src={activeImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Gallery thumbnails */}
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide mb-12"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {[project.image, ...project.galleryImages].map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: "280px",
                height: "200px",
                scrollSnapAlign: "start",
                borderRadius: "8px",
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

        {/* Text content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <h2
              className="uppercase tracking-widest text-text-subtle mb-4"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              About the project
            </h2>
            <p
              className="text-text-muted"
              style={{ fontSize: "17px", lineHeight: "1.8", fontWeight: 400 }}
            >
              {project.body}
            </p>
          </div>

          <div className="md:col-span-2">
            <dl>
              {[
                { label: "Role", value: project.role },
                { label: "Client", value: project.client },
                { label: "Year", value: project.year },
                { label: "Deliverables", value: project.deliverables },
              ].map(({ label, value }) => (
                <div key={label} className="mb-5">
                  <dt
                    className="uppercase tracking-widest text-text-subtle mb-1"
                    style={{ fontSize: "11px", fontWeight: 500 }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-text-primary"
                    style={{ fontSize: "15px", fontWeight: 400 }}
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
