"use client";

import LauncherSidebar from "@/components/app/launcher/LauncherSidebar";
export default function LauncherLayout({ children }: { children: React.ReactNode }) {
  //TODO: 로그인 확인 로직 추가

  return (
    <div className="flex min-h-screen">
      {/*TODO: 로그아웃 로직 추가 */}
      <LauncherSidebar />

      <main className="flex-1 w-full px-6 md:px-10 max-h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
