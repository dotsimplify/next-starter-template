import React from "react";
import styles from "./Faqs.module.css";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  // Add other properties if they exist in your data
}

interface HomeFaqsProps {
  data: FAQItem;
}

const HomeFaqs: React.FC<HomeFaqsProps> = ({ data }) => {
  return (
    <div className={styles.tabs} role="region" aria-label="FAQ Section">
      <div className={styles.tab} role="group">
        <input
          type="checkbox"
          className={styles.input}
          id={`chk${data._id}`}
          aria-expanded="false"
          aria-controls={`faq-content-${data._id}`}
        />
        <label
          className={styles.tabLabel}
          htmlFor={`chk${data._id}`}
          role="heading"
          aria-level={3}
        >
          {data.question}
        </label>
        <div
          id={`faq-content-${data._id}`}
          className={styles.tabContent}
          role="region"
          aria-hidden="true"
        >
          <p>{data.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFaqs;
