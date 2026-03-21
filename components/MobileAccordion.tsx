"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface MobileAccordionProps {
  projects: Project[];
  expandedId: string;
  onClick: (project: Project) => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

const ROW_BORDER = "1px solid rgba(255,255,255,0.50)";

export default function MobileAccordion({
  projects,
  expandedId,
  onClick,
}: MobileAccordionProps) {
  return (
    <div
      className="flex flex-col w-full"
      style={{ borderTop: ROW_BORDER }}
    >
      {projects.map((project) => {
        const isExpanded = expandedId === project.id;

        return (
          <div
            key={project.id}
            onClick={() => onClick(project)}
            style={{ borderBottom: ROW_BORDER, cursor: "pointer" }}
          >
            {/* Row header — title left, year right */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: isExpanded ? "#f0f0f0" : "#888",
                  transition: "color 0.2s ease",
                }}
              >
                {project.title}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#a0a0a0",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {project.year}
              </span>
            </div>

            {/* Image — 2:3 aspect ratio, animates open/closed */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "150vw" : "0vw" }}
              transition={springTransition}
              style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
              }}
            >
              {/* Separate motion.div for layoutId so it doesn't conflict
                  with the desktop panels (which use project.id).
                  On mobile the overlay will fade in without a morph. */}
              <motion.div
                layoutId={`${project.id}-mob`}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={isExpanded}
                />
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
