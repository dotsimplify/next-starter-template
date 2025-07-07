// app/page.tsx
import { UpcomingResults } from "./upcomingResult";
import { homePage } from "./lib/api";

export default async function Home() {
  const { upcoming } = await homePage();
  return <UpcomingResults results={upcoming.results} />;
}

export const dynamic = "force-dynamic";
