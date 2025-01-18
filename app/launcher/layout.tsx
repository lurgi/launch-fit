"use client";

import LauncherSidebar from "@/components/app/launcher/LauncherSidebar";
export default function LauncherLayout({ children }: { children: React.ReactNode }) {
  //TODO: 로그인 확인 로직 추가

  return (
    <div className="flex min-h-screen">
      {/*TODO: 로그아웃 로직 추가 */}
      <LauncherSidebar />

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
