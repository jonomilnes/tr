"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import ProjectPanel from "./ProjectPanel";
import ProjectDetailPanel from "./ProjectDetailPanel";
import MobileAccordion from "./MobileAccordion";

interface HoverExpandGalleryProps {
  projects: Project[];
  onOpen: (project: Project) => void;
  selectedProject: Project | null;
  onClose: () => void;
}

export default function HoverExpandGallery({
  projects,
  onOpen,
  selectedProject,
  onClose,
}: HoverExpandGalleryProps) {
  const [expandedId, setExpandedId] = useState<string>(projects[0].id);

  // When a project is selected, all panels collapse to strips (no image shown).
  // Hovering is locked. effectiveExpandedId = null collapses all.
  const effectiveExpandedId = selectedProject ? null : expandedId;

  const handleHover = (id: string) => {
    if (!selectedProject) setExpandedId(id);
  };

  // Desktop: one click opens the detail (or closes if already selected).
  // Clicking a different collapsed panel while detail is open switches directly.
  const handleDesktopClick = (project: Project) => {
    if (selectedProject?.id === project.id) {
      onClose();
    } else {
      setExpandedId(project.id);
      onOpen(project);
    }
  };

  // Mobile: tap to expand, tap again (expanded) to open overlay.
  const handleMobileClick = (project: Project) => {
    if (expandedId === project.id) {
      onOpen(project);
    } else {
      setExpandedId(project.id);
    }
  };

  return (
    <>
      {/* ── Desktop ──────────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {projects.map((project, i) => (
          <AnimatePresence key={project.id} mode="sync">
            <>
              <ProjectPanel
                project={project}
                isExpanded={effectiveExpandedId === project.id}
                isLast={i === projects.length - 1 && !selectedProject}
                onHover={() => handleHover(project.id)}
                onLeave={() => {}}
                onClick={() => handleDesktopClick(project)}
              />

              {/* Detail panel — inserted immediately after the selected panel */}
              {selectedProject?.id === project.id && (
                <ProjectDetailPanel
                  key={`detail-${project.id}`}
                  project={selectedProject}
                  onClose={onClose}
                />
              )}
            </>
          </AnimatePresence>
        ))}
      </div>

      {/* ── Mobile ───────────────────────────────────────────────────────── */}
      <div className="flex md:hidden w-full flex-col">
        <MobileAccordion
          projects={projects}
          expandedId={expandedId}
          onClick={handleMobileClick}
        />
      </div>
    </>
  );
}
