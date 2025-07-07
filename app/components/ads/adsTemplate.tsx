import React from "react";

interface Ad {
  adContent: string;
  // Add other ad properties as needed
}

interface AdsTemplateProps {
  ads: Ad[];
}

const AdsTemplate: React.FC<AdsTemplateProps> = ({ ads }) => {
  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col md:flex-row md:space-x-1 bg-white">
      {ads.map((single, index) => (
        <div key={`ad-${index}`} className="text-center w-full">
          <div
            dangerouslySetInnerHTML={{ __html: single.adContent }}
            className="box-border flex-1 px-2 pt-4 pb-4  mt-2 mb-2 text-sm font-semibold leading-6 text-gray-900 border-[3px] border-red-500 border-dashed rounded-lg min-h-1 bg-gradient-to-b from-yellow-400 to-white html-content"
          />
        </div>
      ))}
    </section>
  );
};

export default AdsTemplate;
