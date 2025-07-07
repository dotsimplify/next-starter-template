import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="pt-6 bg-black">
      <div className="flex items-center justify-center mb-4 space-x-4">
        <Link
          className="underline text-theme-yellow"
          href={`/legal/privacy-policy`}
        >
          Privacy Policy
        </Link>
        <Link
          className="underline text-theme-yellow"
          href={`/legal/terms-and-conditions`}
        >
          Terms & Conditions
        </Link>
      </div>

      <div className="py-2 text-center bg-theme-yellow">
        <p className="font-semibold">
          © {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME} All Rights
          Reserved
        </p>
      </div>
      <p className="px-6 py-6 pb-8 text-sm text-center md:px-24 text-theme-yellow">
        !! DISCLAIMER:- {process.env.NEXT_PUBLIC_SITE_NAME} is a non-commercial
        website. Viewing This Website Is Your Own Risk, All The Information
        Shown On Website Is Sponsored And We Warn You That Matka Gambling/Satta
        May Be Banned Or Illegal In Your Country..., We Are Not Responsible For
        Any Issues Or Scam..., We Respect All Country Rules/Laws... If You Not
        Agree With Our Site Disclaimer... Please Quit Our Site Right Now. Thank
        You.
      </p>
    </footer>
  );
};

export default Footer;
