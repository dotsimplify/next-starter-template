import { API_TAGS } from "@/constants";
import React from "react";

interface MetaData {
  headerText?: string;
  // Add other properties if they exist in your API response
}

interface MetaData {
  headerText?: string;
}

async function getText(): Promise<MetaData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/home`,
    {
      next: { tags: [API_TAGS.HEADER_TEXT] },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch header text");
  }

  return res.json();
}

const MovingTest = async () => {
  try {
    const data = await getText();
    return <MovingTextComponent text={data.headerText || ""} />;
  } catch (error) {
    console.error("Error fetching header text:", error);
    return <MovingTextComponent text="" />;
  }
};

export default MovingTest;

interface MovingTextComponentProps {
  text: string;
}

export const MovingTextComponent: React.FC<MovingTextComponentProps> = ({
  text,
}) => {
  if (!text) return null;

  // Duplicate the text to create seamless looping
  const displayText = `${text} • `.repeat(6);

  return (
    <div className="py-2 pb-3 m-0 text-base font-medium text-white bg-black overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">{displayText}</div>
      </div>
    </div>
  );
};
