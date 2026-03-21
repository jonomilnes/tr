"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LeftBio from "@/components/LeftBio";
import HoverExpandGallery from "@/components/HoverExpandGallery";
import ProjectOverlay from "@/components/ProjectOverlay";
import MarqueeBanner from "@/components/MarqueeBanner";
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
        {/* Left bio — collapses instantly to 1 strip column when a project is selected */}
        <div
          className="hidden md:flex flex-col justify-center overflow-hidden"
          style={{
            width: selectedProject ? "calc(100vw / 24)" : "50vw",
            backgroundColor: "#0a0a0a",
            height: "100dvh",
            flexShrink: 0,
            position: "sticky",
            top: 0,
          }}
        >
          <LeftBio
            collapsed={!!selectedProject}
            onClose={selectedProject ? () => setSelectedProject(null) : undefined}
          />
        </div>

        {/* Right column — gallery + mobile bio */}
        <div
          className="flex flex-col"
          style={{ width: "100%", flex: "1 1 auto" }}
        >
          {/* Mobile bio */}
          <div
            className="flex md:hidden flex-col"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            {/* Padded content */}
            <div className="p-6">
              <h1
                className="text-text-primary leading-none font-semibold mb-6"
                style={{ fontSize: "1rem", letterSpacing: "-0.03em" }}
              >
                Tamara Roper
              </h1>
              <div
                className="text-text-muted mb-6"
                style={{ fontSize: "1rem", lineHeight: "1.7", fontWeight: 400 }}
              >
                <p className="mb-2">Hello.</p>
                <p className="mb-2">
                  I&apos;m Tamara, currently Associate Copy Director at{" "}
                  <a
                    href="https://saffron-consultants.com/"
                    target="_blank"
                    className="hover:text-text-primary"
                  >
                    Saffron
                  </a>
                  , Madrid.
                </p>
                <p>
                  I lead verbal identity across the agency, bridging the gap
                  between strategy and creative, managing and mentoring within a
                  team of 15. In a week, I might consult on campaign ideation,
                  develop full-bodied creative, or present brand narratives to
                  some of the world&apos;s biggest companies.
                </p>
              </div>
              {/* Links below bio text */}
              <div className="flex flex-col">
                <a
                  className="text-text-muted hover:text-text-primary mb-1"
                  href="mailto:tamara_r@live.co.uk"
                  style={{ fontSize: "1rem" }}
                >
                  tamara_r@live.co.uk
                </a>
                <a
                  className="text-text-muted hover:text-text-primary"
                  href="https://www.linkedin.com/in/tamara-roper-4097abaa"
                  target="_blank"
                  style={{ fontSize: "1rem" }}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Marquee — full width, inside mobile bio, below links */}
            <div className="pb-6">
              <MarqueeBanner />
            </div>
          </div>

          {/* Gallery */}
          <HoverExpandGallery
            projects={projects}
            onOpen={(project) => setSelectedProject(project)}
            selectedProject={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </div>
      </main>

      {/* Overlay — mobile only */}
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
