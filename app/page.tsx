"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LeftBio from "@/components/LeftBio";
import HoverExpandGallery from "@/components/HoverExpandGallery";
import ProjectOverlay from "@/components/ProjectOverlay";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <main
        className="flex flex-col md:flex-row w-full bg-background"
        style={{ minHeight: "100dvh" }}
      >
        {/* Left bio column — desktop only */}
        <div
          className="hidden md:flex flex-col justify-center"
          style={{
            width: "50%",
            backgroundColor: "#0a0a0a",
            height: "100dvh",
            flexShrink: 0,
            position: "sticky",
            top: 0,
          }}
        >
          <LeftBio />
        </div>

        {/* Right column — gallery + mobile bio */}
        <div
          className="flex flex-col"
          style={{
            width: "100%",
            flex: "1 1 auto",
          }}
        >
          {/* Mobile bio — shown only on mobile */}
          <div
            className="flex md:hidden flex-col justify-center py-16 px-6"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <h1
              className="font-serif text-text-primary mb-4 leading-none"
              style={{ fontSize: "clamp(40px, 10vw, 64px)" }}
            >
              Tamara Roper
            </h1>
            <p
              className="font-inter text-text-muted"
              style={{ fontSize: "15px", lineHeight: "1.7", maxWidth: "380px" }}
            >
              Hello. I&apos;m Tamara, currently Associate Copy Director at
              Saffron, Madrid. I lead verbal identity across the agency,
              bridging the gap between strategy and creative, managing and
              mentoring within a team of 15.
            </p>
          </div>

          {/* Gallery */}
          <HoverExpandGallery
            projects={projects}
            onOpen={(project) => setSelectedProject(project)}
          />
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
