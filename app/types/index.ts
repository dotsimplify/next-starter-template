// Common types used throughout the application
import type { ReactNode } from "react";

export interface AllYearData {
  [key: string]: ResultData[];
}

export interface ResultData {
  gameName: string;
  result: string | number;
  resultDate: string;
  createdAt: string;
}

export interface GameResultForMonthChart {
  gameName: string;
  result: number;
  resultDate: string;
  createdAt: string;
  chartTable: string;
  resultTime: string;
  position: number;
}

export interface TableRow {
  resultDate: string;
  createdAt: string;
  [key: string]: string | number; // Dynamic gameName properties
}
export interface RecievedMonthlyChartData {
  [key: string]: GameResultForMonthChart[];
}

export interface MonthlyChartTableProps {
  data: GameResultForMonthChart[];
  key?: number; // key is automatically handled by React, you don't need to specify it in props
  tableKey: string;
}

export interface GameResult {
  gameName: string;
  gameResultTime: string;
  yesterday: number;
  today: number;
}

export interface IResult {
  [key: string]: GameResult[];
}

export interface ResultTableProps {
  results: Record<string, GameResult[]>;
  ads: Ad[];
}

export interface MetaData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  headerText: string;
  content?: string;
  page?: string;
  faqs: Faq[];
  slug?: string;
  updatedAt?: string;
  _id?: string;
}

export interface Game {
  _id: string;
  gameName: string;
  slug: string;
  updatedAt: string;
}

export interface Result {
  _id: string;
  gameName: string;
  yesterday: number;
  today: number;
  gameResultTime: string;
  createdAt: string;
}

export interface GroupedResults {
  [key: string]: Result[];
}

export interface Ad {
  _id: string;
  position: string;
  adContent: string;
}

export interface ChartResult {
  _id: string;
  gameName: string;
  result: number;
  resultDate: string;
  createdAt: string;
}

export interface MonthlyChartData {
  [key: string]: ChartResult[];
}

export interface CompleteData {
  [key: string]: ResultData;
}

export interface YearlyChartData {
  complete: {
    [key: string]: ChartResult;
  };
}

export interface Notification {
  _id: string;
  content: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export interface IBlogPagination {
  blogs: Blog[];
  totalCount: number;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  slug: string;
  tags: string;
  coverAlt?: string;
  createdAt: string;
  updatedAt: string;
  images?: {
    url: string;
  };
}

export interface LegalDocument {
  _id: string;
  title: string;
  term: string;
  slug: string;
  updatedAt: string;
}

export interface DayResult {
  result: number;
  dl?: number;
}

export interface IUpcomingResult {
  gameName: string;
  result: number;
}

export interface UpcomingResult {
  results: IUpcomingResult[];
}

export interface IGameResultTimeWithResult {
  found: boolean;
  result: number;
  gameName: string;
  resultTime: string;
}

export interface PrimaryResult {
  gameName: string;
  yesterday: number;
  today: number;
  createdAt: string;
}

export interface RevalidateResponse {
  revalidated: boolean;
  message?: string;
  error?: string;
  now?: number;
}

export interface ApiResponse {
  message?: string;
  error?: string;
  data?: any;
  statusCode?: number;
}

export interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface ComponentWithChildrenProps {
  children: ReactNode;
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export interface YearData {
  [month: string]: ChartResult[];
}

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  slug: string;
  ogImage?: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface DashboardStats {
  totalGames: number;
  totalResults: number;
  totalBlogs: number;
  totalUsers: number;
  recentResults: Array<{
    id: string;
    gameName: string;
    result: number;
    date: string;
  }>;
}

export interface TableData {
  id: string;
  gameName: string;
  result: number;
  resultDate: string;
  createdAt: string;
  status: "active" | "inactive";
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableProps {
  data: TableData[];
  columns: TableColumn[];
  loading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  token?: string;
}

export interface DashboardStats {
  totalGames: number;
  totalResults: number;
  totalBlogs: number;
  totalUsers: number;
  recentResults: Array<{
    id: string;
    gameName: string;
    result: number;
    date: string;
  }>;
}

export interface TableData {
  id: string;
  gameName: string;
  result: number;
  resultDate: string;
  createdAt: string;
  status: "active" | "inactive";
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableProps {
  data: TableData[];
  columns: TableColumn[];
  loading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
}
