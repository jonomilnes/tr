"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import { PROJECT_COLORS } from "@/data/colors";
import { getImageDimensions } from "@/utils/imageHelper";

interface MobileGalleryProps {
  projects: Project[];
  selectedProject: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 220,
  damping: 35,
};

const TITLE_BAR_H = 52;

export default function MobileGallery({
  projects,
  selectedProject,
  onOpen,
  onClose,
}: MobileGalleryProps) {
  return (
    <div className="flex flex-col w-full">
      {projects.map((project, i) => {
        const isSelected = selectedProject?.id === project.id;
        const colors = PROJECT_COLORS[i] ?? PROJECT_COLORS[0];

        return (
          <div key={project.id}>
            {/* Title bar — always visible */}
            <div
              onClick={() => (isSelected ? onClose() : onOpen(project))}
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

            {/* Detail — springs open below the title bar */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={springTransition}
                  style={{
                    overflow: "hidden",
                    backgroundColor: colors.bg,
                  }}
                >
                  <div style={{ padding: "1rem", color: colors.text }}>
                    {/* Title */}
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        marginBottom: "1.5rem",
                      }}
                    >
                      {project.title}
                    </h2>

                    {/* The brief */}
                    <p style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.45, marginBottom: "0.4rem" }}>
                      The brief
                    </p>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                      {project.brief}
                    </p>

                    {/* The thinking */}
                    <p style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.45, marginBottom: "0.4rem" }}>
                      The thinking
                    </p>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                      {project.thinking}
                    </p>

                    {/* The outcome */}
                    <p style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.45, marginBottom: "0.4rem" }}>
                      The outcome
                    </p>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                      {project.outcome}
                    </p>

                    {/* Images stacked at natural proportions */}
                    {[project.image, ...project.galleryImages].map(
                      (img, idx) => {
                        const { width, height } = getImageDimensions(img);
                        return (
                          <div key={idx} style={{ marginBottom: "0.75rem" }}>
                            <Image
                              src={img}
                              alt={`${project.title} ${idx + 1}`}
                              width={width}
                              height={height}
                              style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                              }}
                              sizes="100vw"
                              priority={idx === 0}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
