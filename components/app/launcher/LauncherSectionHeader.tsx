"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function LauncherSectionHeader({ title, description }: { title?: string; description?: string }) {
  const [isShowSkeleton, setIsShowSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSkeleton(false);
    }, 1000);
  }, []);

  return (
    <section className="w-full max-w-2xl text-center py-12">
      <h1 className={cn("text-3xl font-bold sm:text-4xl h-10", isShowSkeleton && "animate-pulse")}>{title}</h1>
      <p className={cn("mt-4 text-lg text-gray-600 h-6", isShowSkeleton && "animate-pulse")}>{description}</p>
    </section>
  );
}
