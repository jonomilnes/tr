export default function LeftBio() {
  return (
    <div className="flex items-center p-6 h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
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
