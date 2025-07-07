import React from "react";

interface PillProps {
  text: string;
  className?: string; // Optional additional className
}

const Pill: React.FC<PillProps> = ({ text, className = "" }) => {
  return (
    <div
      className={`py-2 text-sm text-center text-black uppercase rounded-lg md:text-sm hover:bg-black hover:text-theme-yellow bg-theme-yellow ${className}`}
    >
      {text}
    </div>
  );
};

export default Pill;
