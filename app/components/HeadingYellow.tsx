import React from "react";

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingYellowProps {
  text: string;
  type: HeadingType;
}

const HeadingYellow: React.FC<HeadingYellowProps> = ({ text, type }) => {
  const commonClasses =
    "text-lg font-bold md:text-3xl text-center border-t border-black border-b p-6 bg-gradient-to-t from-[#ff9000] to-[#ffe400]";
  const HeadingTag = type in ["h1", "h2", "h3", "h4", "h5", "h6"] ? type : "p";

  return React.createElement(HeadingTag, { className: commonClasses }, text);
};

export default HeadingYellow;
