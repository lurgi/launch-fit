import HomeFooter from "@/components/app/HomeFooter";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {children}
      <HomeFooter />
    </div>
  );
}
