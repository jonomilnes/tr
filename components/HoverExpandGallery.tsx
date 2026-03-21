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
  onTransition: (action: () => void) => void;
  contentVisible: boolean;
}

export default function HoverExpandGallery({
  projects,
  onOpen,
  selectedProject,
  onClose,
  onTransition,
  contentVisible,
}: HoverExpandGalleryProps) {
  const [expandedId, setExpandedId] = useState<string>(projects[0].id);

  // When a project is selected all panels collapse to strips.
  const effectiveExpandedId = selectedProject ? null : expandedId;

  const handleHover = (id: string) => {
    if (!selectedProject) setExpandedId(id);
  };

  // Desktop: route every state-changing click through onTransition so
  // content fades out before the layout shifts.
  const handleDesktopClick = (project: Project) => {
    if (selectedProject?.id === project.id) {
      onClose(); // onClose is already transition-wrapped in page.tsx
    } else {
      onTransition(() => {
        setExpandedId(project.id);
        onOpen(project);
      });
    }
  };

  // Mobile: tap to expand, tap again to open overlay (no transition needed).
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
          <div key={project.id} style={{ display: "contents" }}>
            <ProjectPanel
              project={project}
              isExpanded={effectiveExpandedId === project.id}
              isLast={i === projects.length - 1}
              onHover={() => handleHover(project.id)}
              onLeave={() => {}}
              onClick={() => handleDesktopClick(project)}
              contentVisible={contentVisible}
            />
            <ProjectDetailPanel
              project={project}
              isActive={selectedProject?.id === project.id}
              onClose={onClose}
              contentVisible={contentVisible}
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
