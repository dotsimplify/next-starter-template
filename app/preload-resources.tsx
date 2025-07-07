"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  if (typeof window === "undefined") return null;
  ReactDOM.preconnect(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);
  ReactDOM.prefetchDNS(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);

  return null;
}
