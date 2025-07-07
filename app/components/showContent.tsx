import React from "react";

interface ShowContentProps {
  html?: string;
  className?: string;
  fallback?: React.ReactNode;
  wrapperElement?: keyof React.JSX.IntrinsicElements;
}

const ShowContent: React.FC<ShowContentProps> = ({
  html = "",
  className = "",
  fallback = null,
  wrapperElement: Wrapper = "div",
}) => {
  // Return fallback if no HTML or if HTML is just a dash (common CMS placeholder)
  if (!html || html.trim() === "-" || html.trim() === "") {
    return <>{fallback}</>;
  }

  return (
    <Wrapper
      className={`main-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ShowContent;
