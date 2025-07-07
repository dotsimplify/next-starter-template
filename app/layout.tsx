import { PreloadResources } from "@/preload-resources";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import localFont from "next/font/local";
import { JSX } from "react";
import Analytics from "./components/analytics";
import ReduxProvider from "./redux-provider";

const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica-Neue-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Helvetica-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/Helvetica-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-helvetica",
});
export async function generateMetadata() {
  return {
    robots: {
      index: true,
      follow: true,
    },
    referrer: "no-referrer-when-downgrade",
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_TAG,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en-IN">
      <PreloadResources />
      <ReduxProvider>
        <body
          className={`${helvetica.variable} font-sans  max-w-[1600px] mx-auto`}
        >
          <Header />
          {children}
          <Footer />
          <Analytics />
        </body>
      </ReduxProvider>
    </html>
  );
}
