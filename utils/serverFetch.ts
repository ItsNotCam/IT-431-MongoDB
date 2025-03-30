export default async function serverFetch(path: string, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = new URL(path, baseUrl);
  return fetch(url.toString(), options);
}
