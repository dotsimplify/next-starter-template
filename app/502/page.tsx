import MovingTest from "@/components/Header/MovingTest";
import NameStrip from "@/components/Header/NameStrip";
import ClockTime from "@/components/ClockTime";
import UpcomingResults from "@/components/results/errorUpcomingResult";
import { serverTime } from "@/helper";
// Add this at the very top

export default function Custom502() {
  return (
    <div className="bg-black">
      <MovingTest />
      <NameStrip text={process.env.NEXT_PUBLIC_SITE_NAME} />
      <section className="py-5 pb-8 bg-black md:p-6 ">
        <ClockTime initialTime={serverTime} />
        <h2 className="text-2xl px-4 font-bold leading-8 text-center text-white ">
          हा भाई यही आती हे सबसे पहले खबर रूको और देखो
        </h2>
      </section>
      <UpcomingResults />
    </div>
  );
}
