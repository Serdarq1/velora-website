const defaultWaitlistUrl = "https://waitlist.veloraappy.com";

export function getWaitlistUrl() {
  const raw = process.env.NEXT_PUBLIC_WAITLIST_URL?.trim();

  if (!raw) {
    return defaultWaitlistUrl;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  return `https://${raw}`;
}
