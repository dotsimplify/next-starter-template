// components/Clock.tsx
"use client";

import { getCurrentIndianTime } from "@/helper";
import { useState, useEffect } from "react";

interface ClockProps {
  initialTime: string;
}

export default function Clock({ initialTime }: ClockProps) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const deviceTime = getCurrentIndianTime();
      setTime(deviceTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pb-4 text-xl font-semibold text-center text-theme-yellow">
      {time}
    </div>
  );
}
