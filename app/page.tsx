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
      {/* Left bio — desktop only, collapses to 1 strip column when a project is selected */}
      <div
        className="hidden md:flex flex-col justify-center overflow-hidden"
        style={{
          width: selectedProject ? "calc(100vw / 24)" : "50vw",
          backgroundColor: "#121212",
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
        <div className="flex md:hidden" style={{ backgroundColor: "#121212" }}>
          {selectedProject ? (
            // Compact strip — sticky so it stays visible while scrolling detail
            <div
              onClick={() => setSelectedProject(null)}
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                height: "60px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
                cursor: "pointer",
                backgroundColor: "#121212",
              }}
            >
              {/* Email — left */}
              <a
                href="mailto:tamara_r@live.co.uk"
                className="text-text-muted hover:text-text-primary"
                style={{ fontSize: "0.85rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                tamara_r@live.co.uk
              </a>

              {/* Image — centre */}
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/tr.png"
                  alt=""
                  style={{ height: "36px", width: "36px", objectFit: "cover" }}
                />
              </div>

              {/* LinkedIn — right */}
              <a
                href="https://www.linkedin.com/in/tamara-roper-4097abaa"
                target="_blank"
                className="text-text-muted hover:text-text-primary"
                style={{ fontSize: "0.85rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </a>
            </div>
          ) : (
            // Full bio — image at top
            <div className="flex flex-col p-6 w-full">
              <h1 className="sr-only">Tamara Roper</h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tr.png"
                alt=""
                width={64}
                style={{ marginBottom: "1.5rem" }}
              />
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
              <div className="flex flex-col gap-1">
                <a
                  className="text-text-muted hover:text-text-primary"
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
