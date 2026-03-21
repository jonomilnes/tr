"use client";

import { useState } from "react";
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

  // When a project is selected all panels collapse to strips — no image shown.
  const effectiveExpandedId = selectedProject ? null : expandedId;

  const handleHover = (id: string) => {
    if (!selectedProject) setExpandedId(id);
  };

  // One click: expand + open detail. Click selected again: close.
  const handleDesktopClick = (project: Project) => {
    if (selectedProject?.id === project.id) {
      onClose();
    } else {
      setExpandedId(project.id);
      onOpen(project);
    }
  };

  // Mobile: tap to expand, tap expanded to open overlay.
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
          // Each panel is immediately followed by its detail panel.
          // Detail panels always exist in the DOM; flexGrow drives visibility.
          // This avoids mount/unmount conflicts with AnimatePresence.
          <div key={project.id} style={{ display: "contents" }}>
            <ProjectPanel
              project={project}
              isExpanded={effectiveExpandedId === project.id}
              isLast={i === projects.length - 1}
              onHover={() => handleHover(project.id)}
              onLeave={() => {}}
              onClick={() => handleDesktopClick(project)}
            />
            <ProjectDetailPanel
              project={project}
              isActive={selectedProject?.id === project.id}
              onClose={onClose}
            />
          </div>
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
