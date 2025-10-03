"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login as soon as someone lands on "/"
    router.push("/login");
  }, [router]);

  return <p>Redirecting to login...</p>;
}
