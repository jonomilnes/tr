interface LeftBioProps {
  collapsed?: boolean;
}

export default function LeftBio({ collapsed = false }: LeftBioProps) {
  if (collapsed) {
    // 1-column strip: LinkedIn top, photo centre, email bottom — mirrors project panel strips
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem 0",
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

  // Full bio
  return (
    <div className="flex items-center p-6 h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tr.png" width="64" alt="" />
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
        </div>
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
    </div>
  );
}
