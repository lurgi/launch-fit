import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/createClient";
import Image from "next/image";

export default function KakaoAuthButton() {
  const handleKakaoLogin = async () => {
    await signInWithKakao();
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      className="w-full flex items-cener justify-between bg-yellow-300 text-black rounded-md hover:bg-yellow-400"
    >
      <Image src="/kakao.png" alt="kakao logo" width={18} height={18} />
      <div className="text-center flex-1 whitespace-nowrap">카카오 간편 로그인</div>
    </Button>
  );
}

async function signInWithKakao() {
  const supabase = await createBrowserClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/callback`,
    },
  });

  console.log(data, error);
}
