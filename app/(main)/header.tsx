"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { DateTime } from "luxon";

function Header() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="flex items-center justify-between">
        <section className="text-md flex items-center font-medium">
          <div className="mr-1 flex flex-row items-center justify-start">
            <Image
              width={40}
              height={40}
              unoptimized
              alt="apple-touch-icon"
              src={"/apple-touch-icon.png"}
              className="relative !m-0 h-6 w-6 border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          </div>
          Roofangの探针
          <Separator
            orientation="vertical"
            className="mx-2 hidden h-4 w-[1px] md:block"
          />
          <p className="hidden text-sm font-medium opacity-40 md:block">
            服务器状态面板
          </p>
        </section>
        {/* <LiveTag /> */}
      </section>
      <Overview />
    </div>
  );
}

// https://github.com/streamich/react-use/blob/master/src/useInterval.ts
const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};

function Overview() {
  const [mouted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const timeOption = DateTime.TIME_SIMPLE;
  timeOption.hour12 = true;
  const [timeString, setTimeString] = useState(
    DateTime.now().setLocale("en-US").toLocaleString(timeOption),
  );

  useInterval(() => {
    setTimeString(DateTime.now().setLocale("en-US").toLocaleString(timeOption));
  }, 1000);

  return (
    <section className={"mt-10 flex flex-col md:mt-16"}>
      <p className="text-md font-semibold">👋 你好</p>
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-medium opacity-50">现在时间是</p>
        {mouted && (
          <p className="opacity-1 text-sm font-medium">{timeString}</p>
        )}
      </div>
    </section>
  );
}

export default Header;
