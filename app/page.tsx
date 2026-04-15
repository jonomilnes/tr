"use client";

import { useState } from "react";
import LeftBio from "@/components/LeftBio";
import HoverExpandGallery from "@/components/HoverExpandGallery";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main
      className="flex flex-col md:flex-row w-full bg-background"
      style={{ minHeight: "100dvh" }}
    >
      {/* Left bio — desktop only */}
      <div
        className="hidden md:flex flex-col justify-center"
        style={{
          width: selectedProject ? "calc(100vw / 24)" : "50vw",
          backgroundColor: "#ffffff",
          height: "100dvh",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          overflow: selectedProject ? "visible" : "hidden",
          zIndex: selectedProject ? 1 : 0,
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
        {/* ── Mobile bio ──────────────────────────────────────────────── */}
        <div
          className="flex md:hidden"
          style={{
            backgroundColor: "#ffffff",
            position: selectedProject ? "sticky" : "relative",
            top: 0,
            zIndex: 10,
          }}
        >
          {selectedProject ? (
            // Compact strip — email left · name centre · LinkedIn right
            <div
              onClick={() => setSelectedProject(null)}
              style={{
                height: "60px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                padding: "0 1rem",
                cursor: "pointer",
              }}
            >
              <a
                href="mailto:tamara_r@live.co.uk"
                style={{ fontSize: "0.85rem", color: "#202124", opacity: 0.5, textDecoration: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                tamara_r@live.co.uk
              </a>
              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#202124" }}>
                Tamara Roper
              </span>
              <a
                href="https://www.linkedin.com/in/tamara-roper-4097abaa"
                target="_blank"
                style={{ fontSize: "0.85rem", color: "#202124", opacity: 0.5, textDecoration: "none", textAlign: "right", justifySelf: "end" }}
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </a>
            </div>
          ) : (
            // Full mobile bio
            <div className="flex flex-col p-6 w-full" style={{ color: "#202124" }}>
              <h1 className="sr-only">Tamara Roper</h1>
              <p style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                Tamara Roper
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", marginBottom: "1.5rem" }}>
                <a href="mailto:tamara_r@live.co.uk" style={{ fontSize: "1rem", color: "#202124", opacity: 0.5, textDecoration: "none" }}>
                  tamara_r@live.co.uk
                </a>
                <a href="https://www.linkedin.com/in/tamara-roper-4097abaa" target="_blank" style={{ fontSize: "1rem", color: "#202124", opacity: 0.5, textDecoration: "none" }}>
                  LinkedIn
                </a>
              </div>
              <div style={{ fontSize: "1rem", lineHeight: "1.7", fontWeight: 400, opacity: 0.7 }}>
                <p style={{ marginBottom: "0.5rem" }}>Hello.</p>
                <p style={{ marginBottom: "0.5rem" }}>
                  I&apos;m Tamara, currently Associate Copy Director at{" "}
                  <a href="https://saffron-consultants.com/" target="_blank" style={{ color: "#202124" }}>
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
          )}
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
  );
}
