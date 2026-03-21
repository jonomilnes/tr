"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import ProjectPanel from "./ProjectPanel";

interface HoverExpandGalleryProps {
  projects: Project[];
  onOpen: (project: Project) => void;
}

export default function HoverExpandGallery({
  projects,
  onOpen,
}: HoverExpandGalleryProps) {
  const [expandedId, setExpandedId] = useState<string>(projects[0].id);

  const handleHover = (id: string) => {
    setExpandedId(id);
  };

  const handleClick = (project: Project) => {
    if (expandedId === project.id) {
      onOpen(project);
    } else {
      setExpandedId(project.id);
    }
  };

  return (
    <>
      {/* Desktop: vertical flex row of panels, fills 100dvh */}
      <div
        className="hidden md:flex w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {projects.map((project, i) => (
          <ProjectPanel
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            isLast={i === projects.length - 1}
            onHover={() => handleHover(project.id)}
            onLeave={() => {}}
            onClick={() => handleClick(project)}
          />
        ))}
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div
        className="flex md:hidden w-full overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {projects.map((project, i) => (
          <ProjectPanel
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            isLast={i === projects.length - 1}
            onHover={() => handleHover(project.id)}
            onLeave={() => {}}
            onClick={() => handleClick(project)}
            isMobile
          />
        ))}
      </div>
    </>
  );
}
