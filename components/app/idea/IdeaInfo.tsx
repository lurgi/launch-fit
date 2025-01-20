"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function IdeaInfo({ title, description }: { title?: string; description?: string }) {
  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSkeleton(true);
    }, 1000);
  }, []);

  return (
    <section className="w-full max-w-2xl text-center">
      <h1
        className={cn("text-3xl font-bold sm:text-4xl h-10", !title && isShowSkeleton && "bg-gray-200 animate-pulse")}
      >
        {title && title}
      </h1>
      <p
        className={cn("mt-4 text-lg text-gray-600 h-7", !description && isShowSkeleton && "bg-gray-200 animate-pulse")}
      >
        {description && description}
      </p>
    </section>
  );
}
