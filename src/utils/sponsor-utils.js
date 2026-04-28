/**
 * Resolves the logo source for a sponsor, handling both remote URLs and local files.
 * @param {string} logoPath - The logo path or URL from sponsors.json.
 * @returns {string|null} The resolved logo source or null if not found.
 */
export const getSponsorLogo = (logoPath) => {
  if (!logoPath) return null;
  if (logoPath.startsWith("http")) return logoPath;
  
  try {
    const filename = logoPath.split("/").pop();
    // Path relative to this utility file: src/utils -> ../content/logos/
    return require(`../content/logos/${filename}`).default || require(`../content/logos/${filename}`);
  } catch (e) {
    console.warn(`[sponsor-utils] Could not find local logo: ${logoPath}`);
    return null;
  }
};

/**
 * Calculates the dimensions for a sponsor logo based on its tier and an optional scale factor.
 * @param {string} tierName - The sponsorship tier (e.g., 'Diamond', 'Platinum', 'Gold', etc.).
 * @param {number} scale - An optional scale multiplier (default is 1).
 * @param {boolean} isLargePage - Whether to use the larger dimensions (e.g., for the Sponsors page).
 * @returns {{width: string, height: string}} Dimension strings in pixels.
 */
export const getSponsorDimensions = (tierName, scale = 1, isLargePage = false) => {
  const baseDimensions = {
    Diamond: { width: 300, height: 160 },
    Platinum: { width: 260, height: 140 },
    Gold: { width: 220, height: 120 },
    Silver: { width: 200, height: 100 },
    "CNCF Partner": { width: 200, height: 100 },
    Bronze: { width: 180, height: 90 },
    Default: { width: 180, height: 90 }
  };

  const largeDimensions = {
    Diamond: { width: 320, height: 180 },
    Platinum: { width: 280, height: 160 },
    Gold: { width: 240, height: 140 },
    Silver: { width: 220, height: 130 },
    "CNCF Partner": { width: 220, height: 130 },
    Bronze: { width: 200, height: 110 },
    Default: { width: 200, height: 110 }
  };

  const source = isLargePage ? largeDimensions : baseDimensions;
  
  // Find the best matching tier key
  const tierKey = Object.keys(source).find(key => 
    tierName.toLowerCase().includes(key.toLowerCase())
  );
  
  const base = source[tierKey] || source.Default;
  
  return {
    width: `${base.width * scale}px`,
    height: `${base.height * scale}px`
  };
};

/**
 * Maps a sponsorship tier name to its corresponding CSS class.
 * @param {string} tierName - The name of the tier.
 * @returns {string} The CSS class name.
 */
export const getTierClass = (tierName) => {
  const tier = tierName.toLowerCase();
  if (tier.includes("diamond")) return "tier-diamond";
  if (tier.includes("platinum")) return "tier-platinum";
  if (tier.includes("gold")) return "tier-gold";
  if (tier.includes("bronze")) return "tier-bronze";
  if (tier.includes("community")) return "tier-community";
  if (tier.includes("reception")) return "tier-reception";
  return "";
};
