const defaultLandingUrl = "https://veloraappy.com";

export function getLandingUrl() {
  const raw = process.env.NEXT_PUBLIC_LANDING_URL?.trim();

  if (!raw) {
    return defaultLandingUrl;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  return `https://${raw}`;
}
