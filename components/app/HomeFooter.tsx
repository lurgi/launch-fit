import Link from "next/link";
import React from "react";

export default function HomeFooter() {
  return (
    <footer className="h-32 w-full px-6 py-8 text-center border-t text-gray-500 absolute bottom-0">
      <p>© 2025 launch-fit.vercel.app. All rights reserved.</p>
      <div className="mt-4 flex justify-center space-x-4">
        <Link href="/terms" className="hover:underline">
          이용약관
        </Link>
        <a href="/privacy" className="hover:underline">
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}
