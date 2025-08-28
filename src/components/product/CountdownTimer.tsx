"use client";
import Countdown from "react-countdown";

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const CountdownTimer = () => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRendererProps) => {
    if (completed) {
      return <span className="text-green-600 font-bold">Time&apos;s up!</span>;
    } else {
      return (
        <div className="text-xl text-gray-500 font-semibold w-60">
          <div className="flex gap-4 text-xl text-gray-500 font-semibold">
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {days}
              </span>
              <span className="text-sm">Days</span>
            </div>
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {hours}
              </span>
              <span className="text-sm">Hours</span>
            </div>
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {minutes}
              </span>
              <span className="text-sm">Min</span>
            </div>
            <div>
              <span className="w-12 h-12 border-1 border-gray-400 flex justify-center bg-gray-200 items-center">
                {seconds}
              </span>
              <span className="text-sm">Sec</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-4 text-center">
      <Countdown
        date={new Date("2025-12-31T23:59:59")}
        renderer={renderer}
      />
    </div>
  );
};

export default CountdownTimer;
