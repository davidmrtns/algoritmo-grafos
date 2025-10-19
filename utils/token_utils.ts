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

// Temporary function to add token to cookies (the API will add the token when implemented)
export function addTokenToCookies(token: string) {
  const isProduction = process.env.NODE_ENV === "production";

  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; ${
    isProduction ? "secure;" : ""
  } samesite=strict;`;
}

export function removeTokenFromCookies() {
  const isProduction = process.env.NODE_ENV === "production";

  document.cookie = `token=; path=/; max-age=0; ${
    isProduction ? "secure;" : ""
  } samesite=strict;`;
}
