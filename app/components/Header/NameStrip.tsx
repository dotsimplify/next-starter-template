import React from "react";
import Link from "next/link";

interface NameStripProps {
  text?: string; // Making it optional since you have a fallback
}

const NameStrip: React.FC<NameStripProps> = ({ text }) => {
  return (
    <section className="text-center py-7 bg-theme-yellow">
      <Link
        title={process.env.NEXT_PUBLIC_SITE_NAME}
        href={process.env.NEXT_PUBLIC_CLIENT_URL as string}
      >
        <h1 className="text-3xl font-bold text-black blink">{`${
          text || process.env.NEXT_PUBLIC_SITE_NAME
        }`}</h1>
      </Link>
    </section>
  );
};

export default NameStrip;
