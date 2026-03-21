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
                  <div style={{ padding: "1rem" }}>
                    {/* Body */}
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: colors.text,
                        lineHeight: 1.7,
                        marginBottom: "1.5rem",
                      }}
                    >
                      {project.body}
                    </p>

                    {/* Definition list */}
                    <dl style={{ marginBottom: "2rem" }}>
                      {[
                        { label: "Role", value: project.role },
                        { label: "Client", value: project.client },
                        { label: "Year", value: project.year },
                        { label: "Deliverables", value: project.deliverables },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ marginBottom: "0.75rem" }}>
                          <dt
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              color: colors.text,
                              opacity: 0.6,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              marginBottom: "0.15rem",
                            }}
                          >
                            {label}
                          </dt>
                          <dd
                            style={{ fontSize: "0.9rem", color: colors.text }}
                          >
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>

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
