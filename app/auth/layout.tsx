import HomeFooter from "@/components/app/HomeFooter";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center px-6 pb-32 relative">
      <main className="flex-1 flex w-full flex-col items-center justify-center relative overflow-y-auto my-12">
        {children}
      </main>
      <HomeFooter />
    </div>
  );
}
