export function getDecodedToken() {
  if (typeof window === "undefined") {
    // Return null if in server
    return null;
  }

  const cookies = window.document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith("token="));
  return cookie ? cookie.split("=")[1] : null;
  // TODO: add missing decode logic
}