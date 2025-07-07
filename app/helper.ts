import { AllYearData } from "./types";
import axios from "axios";

// Type for DateTimeFormat options
interface DateTimeFormatOptions {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
  hour12?: boolean;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const setAuthorizationToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.common["Access-control-allow-credentials"] = true;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export function getCurrentTime(): string {
  const currentDate = new Date();
  const currentOffset = currentDate.getTimezoneOffset();
  const ISTOffset = 330; // IST offset UTC +5:30
  const now = new Date(
    currentDate.getTime() + (ISTOffset + currentOffset) * 60000
  );

  const currentMonth = months[now.getMonth()];
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  const currentSeconds = now.getSeconds().toString().padStart(2, "0");
  const timeFrame = currentHour >= 12 ? "PM" : "AM";
  const displayHour = currentHour % 12 || 12; // Convert to 12-hour format

  return `${currentMonth} ${currentDay}, ${currentYear} ${displayHour
    .toString()
    .padStart(2, "0")}:${currentMinutes}:${currentSeconds} ${timeFrame}`;
}

export function getCurrentIndianTime(): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return formatter
    .format(new Date())
    .replace(/\u2009/g, " ") // Replace thin spaces
    .replace("at", ""); // Remove comma
}

export function getDeviceTime(): string {
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentTime = new Date().toLocaleTimeString("en-US", options);

  return currentTime.replace("at", "");
}

export const serverTime = getCurrentIndianTime();

export function getMonthYear(uppercase: boolean = false): string {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const formatted = `${month} ${year}`;

  return uppercase ? formatted.toUpperCase() : formatted;
}

export const hideYearFromDateStrict = (date: string): string => {
  const parts = date.split("-");

  if (parts.length !== 3) {
    throw new Error(
      `Invalid date format. Expected 'YYYY-MM-DD', got '${date}'`
    );
  }

  return `${parts[1]}-${parts[2]}`;
};

export const yearNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const yearsArray = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const day = Array.from({ length: 31 }, (_, i) => i + 1);

export const allYear: AllYearData = {
  JAN: [],
  FEB: [],
  MAR: [],
  APR: [],
  MAY: [],
  JUN: [],
  JUL: [],
  AUG: [],
  SEP: [],
  OCT: [],
  NOV: [],
  DEC: [],
};

export const formatDate = (date: string): string => {
  const dateStr = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  return dateStr;
};

export const hideYearFromDate = (date?: string): string | undefined => {
  if (!date) return undefined;
  const newDate = date.split("-");
  return `${newDate[0]}-${newDate[1]}`;
};

export const yesterdayDDMMYYYY = (): string => {
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const dd = String(yesterday.getDate()).padStart(2, "0");
  const mm = String(yesterday.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = yesterday.getFullYear();
  return dd + "-" + mm + "-" + yyyy;
};

export const todayDateAnother = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return dd + "-" + mm + "-" + yyyy;
};

export const uniqueArray = <T>(array: T[], propertyName: keyof T): T[] => {
  if (!array) return [];
  return array.filter(
    (e, i) => array.findIndex((a) => a[propertyName] === e[propertyName]) === i
  );
};

export const groupBy = <T>(
  arr: T[],
  property: keyof T
): Record<string, T[]> => {
  if (!arr || !arr.length) return {};

  return arr.reduce((memo: Record<string, T[]>, x: T) => {
    const key = String(x[property]);
    if (!memo[key]) {
      memo[key] = [];
    }
    memo[key].push(x);
    return memo;
  }, {});
};

export function formatTimeWithAmPm(timeString: string): string {
  // Split the string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Validate input
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(
      'Invalid time format. Expected "HH:MM" with hours 0-23 and minutes 0-59'
    );
  }

  // Determine AM/PM
  const period = hours < 12 ? "AM" : "PM";

  // Convert to 12-hour format
  const twelveHour = hours % 12 || 12;

  // Format with leading zero for minutes and return
  return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function getYearsDescending(endYear: number): number[] {
  const currentYear = new Date().getFullYear();

  // Validate input
  if (typeof endYear !== "number" || endYear > currentYear) {
    throw new Error(
      `endYear must be a number less than or equal to ${currentYear}`
    );
  }

  const years: number[] = [];

  for (let year = currentYear; year >= endYear; year--) {
    years.push(year);
  }

  return years;
}

export const stringSorting = (arr: string[]): string[] => {
  if (!arr || !arr.length) return [];

  const sorted: string[] = [];
  const ascending = [...arr].sort((a, b) => {
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
  });
  sorted.push(...ascending);
  return sorted;
};

export const mixedSorting = (arr: string[]): string[] => {
  if (!arr || !arr.length) return [];

  const sorted: string[] = [];
  const ascending = [...arr].sort((a, b) => {
    const num1 = a.match(/\d+/);
    const num2 = b.match(/\d+/);
    return num1 && num2
      ? Number.parseInt(num1[0]) > Number.parseInt(num2[0])
        ? 1
        : -1
      : 0;
  });
  sorted.push(...ascending);
  return sorted;
};

export const dateSorting = (arr: string[]): string[] => {
  if (!arr || !arr.length) return [];

  const sorted: string[] = [];
  const ascending = [...arr].sort((a, b) => {
    return new Date(a).setHours(0, 0, 0, 0) - new Date(b).setHours(0, 0, 0, 0);
  });
  sorted.push(...ascending);
  return sorted;
};

export const stringSortingWithProperties = <T>(arr: T[], col: keyof T): T[] => {
  if (!arr || !arr.length) return [];

  const sorted: T[] = [];
  const ascending = [...arr].sort((a, b) => {
    const aVal = String(a[col]).toLowerCase();
    const bVal = String(b[col]).toLowerCase();
    return aVal > bVal ? 1 : -1;
  });
  sorted.push(...ascending);
  return sorted;
};

export const dateSortingWithColumn = <T>(arr: T[], col: keyof T): T[] => {
  if (!arr || !arr.length) return [];

  const sorted: T[] = [];
  const ascending = [...arr].sort((a, b) => {
    const aStr = String(a[col]);
    const bStr = String(b[col]);
    const [d, m, y] = aStr.split("-");
    const [d1, m1, y1] = bStr.split("-");

    return (
      new Date(Number(y), Number(m) - 1, Number(d)).setHours(0, 0, 0, 0) -
      new Date(Number(y1), Number(m1) - 1, Number(d1)).setHours(0, 0, 0, 0)
    );
  });
  sorted.push(...ascending);
  return sorted;
};

function reverseDate(str: string): number {
  const newStr = str.split("-").reverse().join("-");
  return new Date(newStr).valueOf();
}

export const dateSortingWithIndexOf = <T>(arr: T[], col: keyof T): T[] => {
  if (!arr || !arr.length) return [];

  const sorted: T[] = [];
  const ascending = [...arr].sort((a, b) => {
    const first = reverseDate(String(a[col]));
    const second = reverseDate(String(b[col]));
    return Number.parseInt(String(first)) - Number.parseInt(String(second));
  });
  sorted.push(...ascending);
  return sorted;
};

export const strReplace = (str?: string): string => {
  return str ? str.split("-").join(" ") : "";
};

export const dateWithoutHoursSorting = <T>(
  arr: T[],
  property: keyof T
): T[] => {
  if (!arr || !arr.length) return [];

  const sorted: T[] = [];
  const ascending = [...arr].sort((a, b) => {
    const aStr = String(a[property]);
    const bStr = String(b[property]);
    const reversedA = aStr.split("-").reverse().join("-");
    const reversedB = bStr.split("-").reverse().join("-");
    return (
      new Date(reversedA).setHours(0, 0, 0, 0) -
      new Date(reversedB).setHours(0, 0, 0, 0)
    );
  });
  sorted.push(...ascending);
  return sorted;
};

export const createTableColums = <T>(arr: Record<string, T>): string[] => {
  if (!arr) return [];

  const returnArray: string[] = [];
  for (const key in arr) {
    const single = arr[key] as Record<string, any>;
    for (const key2 in single) {
      returnArray.push(key2);
    }
  }
  return returnArray;
};

export const formatResultDate = (date: string): string => {
  if (!date) return "";

  const pieces = date.split("-");
  return `${pieces[0]}-${pieces[1]}`;
};

export const getTimeFromISO = (ISO: string): string => {
  if (!ISO) return "";

  const dateNow = new Date(ISO);
  const extractTime = dateNow.toLocaleTimeString().split(":");
  if (parseInt(extractTime[0]) < 10) {
    return `0${extractTime[0]}:${extractTime[1]} AM`;
  }
  return `${extractTime[0]}:${extractTime[1]} PM`;
};

export const addZero = (num: number): string => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

export const AM_PM_Time = (time: string): string => {
  if (!time) return "";

  // Check correct time format and split into components
  const timeMatch = time
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/);

  if (timeMatch && timeMatch.length > 1) {
    // If time format correct
    const timeArray = timeMatch.slice(1); // Remove full string match value
    const hour = parseInt(timeArray[0]);
    timeArray[0] = String(hour % 12 || 12); // Adjust hours
    timeArray.push(hour < 12 ? " AM" : " PM"); // Set AM/PM
    return timeArray.join("");
  }

  return time; // return original string if format doesn't match
};

// Date as argument 20-01-2002
export const splitMonthFromDate = (date: string): number => {
  if (!date) return 0;

  const month = date.split("-")[1];
  return Number(month);
};

export const addSlash = (string: string): string => {
  if (!string) return "";

  const withDot =
    string.indexOf(".") >= 0 ? string.split(".").join("") : string;
  if (withDot.indexOf(" ") >= 0) {
    return withDot.split(" ").join("-");
  }
  return string;
};

export const timeAgoWithDate = (date: string): string => {
  if (!date) return "";

  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 86400;
  if (interval > 1) {
    return new Date(date).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    });
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const tagExtract = (str: string): string[] => {
  if (!str) return [];

  const tags = str.split(" ").join("");
  const newTags = tags.replace(/,/g, " ").split(" ");
  return newTags;
};

export const strToUrl = (str: string): string => {
  if (!str) return "";

  if (/\s/.test(str)) {
    const tags = str.split(" ").join("-");
    return tags;
  }
  return str;
};

export function getFullMonthWithYear(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return `${currentMonth} ${currentYear}`;
}

export const stringClip = (str: string, length: number): string => {
  if (!str) return "";

  if (str.length > length) {
    return str.slice(0, length).concat("...");
  }
  return str;
};

export const singleFaq = (
  question: string,
  answer: string
): Record<string, any> => {
  return {
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  };
};

export const faqSchema = (): Record<string, any> => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to find an apprenticeship?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "<p>We provide an official service to search through available apprenticeships. To get started, create an account here, specify the desired region, and your preferences. You will be able to search through all officially registered open apprenticeships.</p>",
        },
      },
      {
        "@type": "Question",
        name: "Whom to contact?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact the apprenticeship office through our official phone hotline above, or with the web-form below. We generally respond to written requests within 7-10 days.",
        },
      },
    ],
  };
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: `${process.env.NEXT_PUBLIC_SITE_NAME} HOME`,
      item: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Chart",
      item: `${process.env.NEXT_PUBLIC_CLIENT_URL}/chart`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Contact",
      item: `${process.env.NEXT_PUBLIC_CLIENT_URL}/contact`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "playbazaar",
      item: `${process.env.NEXT_PUBLIC_CLIENT_URL}/playbazaar`,
    },
  ],
};

export function getCurrentMonthFullName(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthIndex = new Date().getMonth(); // Get the index of the current month (0-11)

  return months[currentMonthIndex];
}

export const size = { width: 512, height: 512 };

export async function getSeo(
  slug: string,
  canonical?: string,
  generatedOgImage?: string
): Promise<Record<string, any>> {
  if (!slug) return {};

  // fetch data
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LIVE_API_URL}/get-meta-by-page/${slug}`
    ).then((res) => res.json());

    return {
      title: response.metaTitle,
      description: response.metaDescription,
      keywords: response.metaKeywords,
      alternates: {
        canonical: canonical || `${process.env.NEXT_PUBLIC_CLIENT_URL}/${slug}`,
      },
      openGraph: {
        locale: "en_IN",
        type: "website",
        images: generatedOgImage
          ? [generatedOgImage, { size, alt: `${slug} satta king` }]
          : [`${process.env.NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
      },
    };
  } catch (error) {
    console.error(`Error fetching SEO data for ${slug}:`, error);
    return {
      title: `${slug} - Satta King`,
      description: `Information about ${slug}`,
      alternates: {
        canonical: canonical || `${process.env.NEXT_PUBLIC_CLIENT_URL}/${slug}`,
      },
      openGraph: {
        locale: "en_IN",
        type: "website",
        images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/logo.jpg`],
      },
    };
  }
}
