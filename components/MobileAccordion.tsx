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

// Image is 1:1, inset 24px on left/right/bottom, flush to top.
// Container height = image height + bottom inset
//   = (100vw - 48px) + 24px = calc(100vw - 24px)
const IMG_EXPANDED_H = "calc(100vw - 24px)";

export default function MobileAccordion({
  projects,
  expandedId,
  onClick,
}: MobileAccordionProps) {
  return (
    <div className="flex flex-col w-full" style={{ borderTop: ROW_BORDER }}>
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

            {/* Image — 1:1, inset 24px on bottom/left/right */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? IMG_EXPANDED_H : "0px" }}
              transition={springTransition}
              style={{ overflow: "hidden", width: "100%" }}
            >
              {/* Inset wrapper: no top, 24px on left/right/bottom */}
              <div
                style={{
                  margin: "0 24px 24px 24px",
                  position: "relative",
                  aspectRatio: "1 / 1",
                }}
              >
                <motion.div
                  layoutId={`${project.id}-mob`}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: "absolute", inset: 0, overflow: "hidden" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="calc(100vw - 48px)"
                    priority={isExpanded}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
