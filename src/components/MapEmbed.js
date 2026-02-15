import * as React from "react";

/**
 * MapEmbed Component
 *
 * Responsive iframe wrapper for embedded maps and interactive floor plans.
 * Maintains aspect ratio, provides accessibility features, and includes fallback links.
 *
 * @param {string} src - URL of the iframe content (required)
 * @param {string} title - Accessibility title for the iframe (required)
 * @param {string} aspectRatio - Aspect ratio (default: "16:9")
 *   Options: "16:9", "4:3", "21:9", or custom like "2:1"
 * @param {number} height - Optional fixed height in pixels (overrides aspectRatio on desktop)
 */
export default function MapEmbed({
  src,
  title,
  aspectRatio = "16:9",
  height
}) {
  if (!src || !title) {
    console.error("MapEmbed requires both 'src' and 'title' props");
    return null;
  }

  // Calculate padding-bottom percentage from aspect ratio
  const calculatePadding = (ratio) => {
    const [width, height] = ratio.split(":").map(Number);
    return (height / width) * 100;
  };

  const paddingBottom = calculatePadding(aspectRatio);

  // Inline style for responsive wrapper (unless fixed height is specified)
  const wrapperStyle = height
    ? { height: `${height}px` }
    : { paddingBottom: `${paddingBottom}%` };

  return (
    <div className="kcd-ny-map-embed-container">
      <div
        className="kcd-ny-map-embed-wrapper"
        style={wrapperStyle}
      >
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          className="kcd-ny-map-embed-iframe"
          aria-label={title}
        />
      </div>

      <noscript>
        <div className="notification is-warning">
          <p>
            <strong>JavaScript Required:</strong> This interactive map requires JavaScript to be enabled.
            {" "}
            <a href={src} target="_blank" rel="noopener noreferrer">
              View the map in a new window
            </a>
          </p>
        </div>
      </noscript>

      <div className="kcd-ny-map-fallback">
        <p className="is-size-7 has-text-grey has-text-centered" style={{ marginTop: "0.5rem" }}>
          Having trouble viewing the map?{" "}
          <a href={src} target="_blank" rel="noopener noreferrer">
            Open in new window
          </a>
        </p>
      </div>
    </div>
  );
}
