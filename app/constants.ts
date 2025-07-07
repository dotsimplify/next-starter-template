// Environment variables
export const NEXT_PUBLIC_CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "";
export const NEXT_PUBLIC_LIVE_API_URL =
  process.env.NEXT_PUBLIC_LIVE_API_URL || "";
export const NEXT_PUBLIC_SERVER_PORT =
  process.env.NEXT_PUBLIC_SERVER_PORT || "";
export const NEXT_PUBLIC_SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Satta King";
export const NEXT_PUBLIC_GOOGLE_TAG = process.env.NEXT_PUBLIC_GOOGLE_TAG || "";
export const REVALIDATE_SECRET_TOKEN =
  process.env.REVALIDATE_SECRET_TOKEN || "";

// Date constants
export const MONTHS = [
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

export const SHORT_MONTHS = [
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

// API tags
export const API_TAGS = {
  HOME: "home",
  HEADER_TEXT: "headerText",
  GAMES: "games",
  CHARTS: "charts",
  RESULTS: "results",
  BLOGS: "blogs",
  MONTHLY_CHART: "monthlyChart",
  YEARLY_CHART: "yearChart",
  ADS: "ads",
  NOTIFICATIONS: "homeNotifications",
  STATIC_PAGES: "staticPages",
  LEGAL: "legal",
  UPCOMING_RESULTS: "upcomingResults",
  PRIMARY_RESULTS: "newposts",
  DB_RESULT: "dbResult",
  CONTENT: "content",
};

// Years for historical data
export const HISTORICAL_YEARS = [2022, 2023, 2024];

// Error messages
export const ERROR_MESSAGES = {
  GENERAL: "Something went wrong. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  VALIDATION: "Please check your input and try again.",
};

// Page titles and descriptions
export const PAGE_META = {
  HOME: {
    TITLE: "Satta King - Live Results & Charts",
    DESCRIPTION: "Get the latest Satta King results, charts, and updates.",
  },
  CHART: {
    TITLE: "Satta King Chart - Historical Data",
    DESCRIPTION: "View historical Satta King charts and results.",
  },
  CONTACT: {
    TITLE: "Contact Us - Satta King",
    DESCRIPTION: "Get in touch with us for any queries or feedback.",
  },
  PLAY_BAZAAR: {
    TITLE: "Play Bazaar - Satta King",
    DESCRIPTION: "View Play Bazaar charts and results.",
  },
  LEGAL: {
    TITLE: "Legal Information - Satta King",
    DESCRIPTION: "Legal information and terms of use.",
  },
  NEWS: {
    TITLE: "Latest News - Satta King",
    DESCRIPTION: "Get the latest news and updates about Satta King.",
  },
};

// Layout constants
export const LAYOUT = {
  MAX_WIDTH: "1500px",
};
