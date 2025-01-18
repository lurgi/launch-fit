import React from "react";

export default function HomeFooter() {
  return (
    <footer className="w-full px-6 py-8 text-center border-t text-gray-500 fixed bottom-0">
      <p>© 2025 Prelaunch.kr. All rights reserved.</p>
      <div className="mt-4 flex justify-center space-x-4">
        <a href="/terms" className="hover:underline">
          이용약관
        </a>
        <a href="/privacy" className="hover:underline">
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}
