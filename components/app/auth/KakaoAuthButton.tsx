"use client";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/browserClient";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function KakaoAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const handleKakaoLogin = async () => {
    setIsLoading(true);
    await signInWithKakao();
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      className="w-full flex items-cener justify-between bg-yellow-300 text-black rounded-md hover:bg-yellow-400"
    >
      <Image src="/kakao.png" alt="kakao logo" width={18} height={18} />
      <div className="text-center flex-1 whitespace-nowrap ">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "카카오 간편 로그인"}
      </div>
    </Button>
  );
}

async function signInWithKakao() {
  const supabase = createBrowserClient();
  await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/callback`,
    },
  });
}
