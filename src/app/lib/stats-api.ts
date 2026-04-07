const rawApiBaseUrl = import.meta.env.VITE_STATS_API_URL?.trim() || "";

const normalizedApiBaseUrl = rawApiBaseUrl.endsWith("/")
  ? rawApiBaseUrl.slice(0, -1)
  : rawApiBaseUrl;

export const statsApiUrl = normalizedApiBaseUrl
  ? `${normalizedApiBaseUrl}/api/stats`
  : "/api/stats";

export const shouldFetchLiveStats =
  import.meta.env.VITE_ENABLE_LIVE_STATS !== "false" &&
  Boolean(normalizedApiBaseUrl || !window.location.hostname.endsWith("github.io"));
