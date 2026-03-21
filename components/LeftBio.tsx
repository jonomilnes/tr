import MarqueeBanner from "./MarqueeBanner";

interface LeftBioProps {
  collapsed?: boolean;
  onClose?: () => void;
}

export default function LeftBio({ collapsed = false, onClose }: LeftBioProps) {
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
        {/* LinkedIn — top, vertical (mirrors year position) */}
        <a
          href="https://www.linkedin.com/in/tamara-roper-4097abaa"
          target="_blank"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1rem",
            color: "#a0a0a0",
            textDecoration: "none",
            flexShrink: 0,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          LinkedIn
        </a>

        <div style={{ flex: 1 }} />

        {/* Profile photo — centre */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/tr.png"
          alt=""
          style={{
            width: "80%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        <div style={{ flex: 1 }} />

        {/* Email — bottom, vertical (mirrors title position) */}
        <a
          href="mailto:tamara_r@live.co.uk"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1rem",
            color: "#a0a0a0",
            textDecoration: "none",
            flexShrink: 0,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          tamara_r@live.co.uk
        </a>
      </div>
    );
  }

  // Full bio — flex column, marquee at the bottom
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* H1 for SEO — visually hidden */}
      <h1 className="sr-only">Tamara Roper</h1>

      <div className="flex flex-col justify-between flex-1 p-6 min-h-0">
        {/* Top row: image + links top-right */}
        <div className="flex justify-between items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tr.png" width="64" alt="" />
          <div className="flex flex-col items-end gap-1">
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

        {/* Bio text — pushed to bottom */}
        <div
          className="text-text-muted"
          style={{
            fontSize: "1rem",
            maxWidth: "380px",
            lineHeight: "1.7",
            fontWeight: 400,
          }}
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
            I lead verbal identity across the agency, bridging the gap between
            strategy and creative, managing and mentoring within a team of 15.
            In a week, I might consult on campaign ideation, develop full-bodied
            creative, or present brand narratives to some of the world&apos;s
            biggest companies.
          </p>
        </div>
      </div>

      {/* Marquee — full width of the bio container, outside the padding */}
      <div className="pb-6">
        <MarqueeBanner />
      </div>
    </div>
  );
}
