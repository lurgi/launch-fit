"use client";
import LauncherSidebar from "@/components/app/launcher/LauncherSidebar";

export default function LauncherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <LauncherSidebar />

      <main className="w-full px-6 md:px-10 max-h-screen overflow-y-auto flex flex-col items-center">
        <div className="px-6 flex flex-col items-center max-w-3xl w-full">{children}</div>
      </main>
    </div>
  );
}
