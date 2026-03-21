"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LeftBio from "@/components/LeftBio";
import HoverExpandGallery from "@/components/HoverExpandGallery";
import ProjectOverlay from "@/components/ProjectOverlay";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <main
        className="flex flex-col md:flex-row w-full bg-background"
        style={{ minHeight: "100dvh" }}
      >
        {/* Left bio — desktop only, slides out when a project is selected */}
        <motion.div
          className="hidden md:flex flex-col justify-center overflow-hidden"
          animate={{ width: selectedProject ? "0vw" : "50vw" }}
          transition={springTransition}
          style={{
            backgroundColor: "#0a0a0a",
            height: "100dvh",
            flexShrink: 0,
            position: "sticky",
            top: 0,
          }}
        >
          <LeftBio />
        </motion.div>

        {/* Right column — gallery + mobile bio */}
        <div
          className="flex flex-col"
          style={{ width: "100%", flex: "1 1 auto" }}
        >
          {/* Mobile bio — shown only on mobile */}
          <div
            className="flex md:hidden flex-col justify-center p-6"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <h1
              className="text-text-primary leading-none font-semibold mb-2"
              style={{ fontSize: "1rem", letterSpacing: "-0.03em" }}
            >
              Tamara Roper
            </h1>
            <div className="flex flex-col">
              <a
                className="text-text-muted hover:text-text-primary mb-2"
                href="mailto:tamara_r@live.co.uk"
              >
                tamara_r@live.co.uk
              </a>
              <a
                className="text-text-muted hover:text-text-primary"
                href="https://www.linkedin.com/in/tamara-roper-4097abaa"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div
              className="text-text-muted mt-12"
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

      {/* Overlay — mobile only (md:hidden applied inside ProjectOverlay) */}
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
