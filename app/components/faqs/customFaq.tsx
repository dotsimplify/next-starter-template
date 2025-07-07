import { formatTimeWithAmPm, todayDateAnother } from "@/helper";
import React from "react";
import styles from "./Faqs.module.css";

export interface IGameResultTimeWithResult {
  found: boolean;
  result: number;
  gameName: string;
  resultTime: string;
}

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

interface CustomFaqProps {
  dlResult: IGameResultTimeWithResult;
}

const CustomFaqComponent: React.FC<CustomFaqProps> = ({ dlResult }) => {
  const todayDate = todayDateAnother();
  const customFaq: Faq = {
    _id: "custom-faq",
    question: `What is today ${dlResult?.gameName} satta result?`,
    answer: `Today ${dlResult?.gameName} result (${todayDate}) ${
      dlResult?.result !== -1
        ? `is ${dlResult.result}`
        : `will be published at ${formatTimeWithAmPm(dlResult.resultTime)}.`
    }`,
  };

  // If you want to render the FAQ directly:
  return (
    <div className={styles.tabs}>
      <div className={styles.tab}>
        <input
          type="checkbox"
          className={styles.input}
          id={`chk${customFaq._id}`}
          aria-expanded="false"
          aria-controls={`faq-content-${customFaq._id}`}
        />
        <label
          className={styles.tabLabel}
          htmlFor={`chk${customFaq._id}`}
          role="button"
          tabIndex={0}
        >
          {customFaq.question}
        </label>
        <div
          id={`faq-content-${customFaq._id}`}
          className={styles.tabContent}
          aria-labelledby={`chk${customFaq._id}`}
        >
          {customFaq.answer}
        </div>
      </div>
    </div>
  );
};

export default CustomFaqComponent;
