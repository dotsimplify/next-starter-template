import React from "react";
import Image from "next/image";

export default function ReloadButton() {
  return (
    <a
      href="/"
      aria-label="Click to refresh website"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "-4px",
        zIndex: "9",
        maxWidth: "100rem",
      }}
    >
      <div
        className="max-w-[1500px]"
        style={{ height: "50px", width: "130px" }}
      >
        <Image
          width={820}
          height={322}
          alt="refresh-site"
          src="/images/refresh.avif"
          placeholder="blur"
          blurDataURL={"/images/refresh.avif"}
        />
      </div>
    </a>
  );
}
