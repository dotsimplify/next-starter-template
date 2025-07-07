"use client";

import Script from "next/script";

export default function Analytics() {
  const ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG;

  return (
    <>
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ID}`}
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ID}');
          `,
        }}
      />
    </>
  );
}
