"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDecodedToken } from "../../utils/token_utils";

export default function Home() {
  const router = useRouter();

  // Fallback redirect, in case the middleware fails for some reason
  useEffect(() => {
    const token = getDecodedToken();
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
