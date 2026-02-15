import * as React from "react";
import { useState } from "react";

/**
 * PhotoGallery Component
 *
 * Displays a filterable, responsive photo gallery with year-based filtering
 * and lazy loading support.
 *
 * @param {Array} photos - Array of photo objects with structure:
 *   - id: string - Unique identifier
 *   - filename: string - Image filename
 *   - year: number - Event year (2024, 2025, etc.)
 *   - category: string - Photo category
 *   - caption: string - Display caption
 *   - featured: boolean - Featured status
 *   - alt: string - Accessibility alt text
 * @param {number} columns - Number of columns (default: 3)
 * @param {boolean} showYearFilter - Show year filter tabs (default: true)
 */
export default function PhotoGallery({
  photos = [],
  columns = 3,
  showYearFilter = true
}) {
  const [selectedYear, setSelectedYear] = useState("all");

  // Extract unique years from photos and sort descending
  const years = [...new Set(photos.map(p => p.year))].sort((a, b) => b - a);

  // Filter photos based on selected year
  const filteredPhotos = selectedYear === "all"
    ? photos
    : photos.filter(p => p.year === parseInt(selectedYear));

  // Handle year filter change
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="kcd-ny-gallery-section">
      <div className="container">
        <h2 className="title is-2 has-text-centered has-text-white">
          Our Community in Action
        </h2>
        <p className="subtitle is-5 has-text-centered has-text-white" style={{ marginBottom: "3rem" }}>
          Highlights from past Kubernetes Community Days New York events
        </p>

        {showYearFilter && years.length > 0 && (
          <div className="kcd-ny-gallery-tabs">
            <button
              className={`kcd-ny-gallery-tab ${selectedYear === "all" ? "active" : ""}`}
              onClick={() => handleYearChange("all")}
              aria-label="Filter photos from all years"
              aria-pressed={selectedYear === "all"}
            >
              All Years
            </button>
            {years.map(year => (
              <button
                key={year}
                className={`kcd-ny-gallery-tab ${selectedYear === String(year) ? "active" : ""}`}
                onClick={() => handleYearChange(String(year))}
                aria-label={`Filter photos from ${year}`}
                aria-pressed={selectedYear === String(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        <div
          className="kcd-ny-photo-grid"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 3 ? '300px' : columns === 2 ? '400px' : '100%'}, 1fr))`
          }}
        >
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map(photo => (
              <div
                key={photo.id}
                className="kcd-ny-photo-item"
                role="img"
                aria-label={photo.alt}
              >
                <img
                  src={`/images/gallery/${photo.year}/${photo.filename}`}
                  alt={photo.alt}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback for missing images
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3Ctext fill='%23fff' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                    e.target.alt = "Image placeholder";
                  }}
                />
                <div className="kcd-ny-photo-overlay">
                  <span className="kcd-ny-photo-year">KCD NY {photo.year}</span>
                  <p className="kcd-ny-photo-caption">{photo.caption}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="has-text-centered has-text-white" style={{ gridColumn: "1 / -1", padding: "3rem" }}>
              <p className="title is-4 has-text-white">No photos available for {selectedYear === "all" ? "display" : selectedYear}</p>
              <p className="subtitle is-6 has-text-white">Check back soon for event photos!</p>
            </div>
          )}
        </div>

        <div className="has-text-centered" style={{ marginTop: "3rem" }}>
          <a
            href="https://www.flickr.com/photos/kcdnewyork/albums/"
            className="button is-large kcd-ny-button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Photos on Flickr
          </a>
        </div>
      </div>
    </div>
  );
}
