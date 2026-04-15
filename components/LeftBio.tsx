const TEXT = "#202124";

interface LeftBioProps {
  collapsed?: boolean;
  onClose?: () => void;
}

export default function LeftBio({ collapsed = false, onClose }: LeftBioProps) {
  // ── Collapsed: 1-column vertical strip ──────────────────────────────────
  if (collapsed) {
    return (
      <div
        onClick={onClose}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem 0",
          cursor: onClose ? "pointer" : "default",
        }}
      >
        {/* LinkedIn — top (mirrors year position) */}
        <a
          href="https://www.linkedin.com/in/tamara-roper-4097abaa"
          target="_blank"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1rem",
            color: TEXT,
            opacity: 0.5,
            textDecoration: "none",
            flexShrink: 0,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          onClick={(e) => e.stopPropagation()}
        >
          LinkedIn
        </a>

        <div style={{ flex: 1 }} />

        {/* Name — vertical, centre (replaces photo) */}
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1rem",
            fontWeight: 500,
            color: TEXT,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          Tamara Roper
        </span>

        <div style={{ flex: 1 }} />

        {/* Email — bottom (mirrors title position) */}
        <a
          href="mailto:tamara_r@live.co.uk"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1rem",
            color: TEXT,
            opacity: 0.5,
            textDecoration: "none",
            flexShrink: 0,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          onClick={(e) => e.stopPropagation()}
        >
          tamara_r@live.co.uk
        </a>
      </div>
    );
  }

  // ── Expanded: full bio ───────────────────────────────────────────────────
  return (
    <div
      className="h-full p-6"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="sr-only">Tamara Roper</h1>

      {/* Top-left: name + links */}
      <div>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: TEXT,
            marginBottom: "0.5rem",
          }}
        >
          Tamara Roper
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <a
            href="mailto:tamara_r@live.co.uk"
            style={{ fontSize: "1rem", color: TEXT, opacity: 0.5, textDecoration: "none", transition: "opacity 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          >
            tamara_r@live.co.uk
          </a>
          <a
            href="https://www.linkedin.com/in/tamara-roper-4097abaa"
            target="_blank"
            style={{ fontSize: "1rem", color: TEXT, opacity: 0.5, textDecoration: "none", transition: "opacity 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom-left: intro text */}
      <div
        style={{
          fontSize: "1rem",
          color: TEXT,
          maxWidth: "380px",
          lineHeight: "1.7",
          fontWeight: 400,
          opacity: 0.7,
        }}
      >
        <p style={{ marginBottom: "0.5rem" }}>Hello.</p>
        <p style={{ marginBottom: "0.5rem" }}>
          I&apos;m Tamara, currently Associate Copy Director at{" "}
          <a
            href="https://saffron-consultants.com/"
            target="_blank"
            style={{ color: TEXT, opacity: 1, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Saffron
          </a>
          , Madrid.
        </p>
        <p>
          I lead verbal identity across the agency, bridging the gap between
          strategy and creative, managing and mentoring within a team of 15. In
          a week, I might consult on campaign ideation, develop full-bodied
          creative, or present brand narratives to some of the world&apos;s
          biggest companies.
        </p>
      </div>
    </div>
  );
}
