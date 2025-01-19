"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBarChart, FiPlusCircle, FiMenu, FiLogOut } from "react-icons/fi";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { createBrowserClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

export default function LauncherSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex">
      {/* 모바일 메뉴 버튼 */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="absolute top-4 left-4 z-50 p-4 md:hidden [&_svg]:w-6 [&_svg]:h-6"
          >
            <FiMenu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 bg-white border-r border-gray-200 shadow-md">
          <SheetTitle>
            <VisuallyHidden>사이드바 메뉴</VisuallyHidden>
          </SheetTitle>
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* 데스크탑 사이드바 */}
      <aside className="relative hidden md:flex flex-col w-60 h-screen bg-white border-r border-gray-200 shadow-md p-4">
        <SidebarContent pathname={pathname} />
      </aside>
    </div>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const navItems = [
    { name: "대시보드", href: "/launcher/idea-dashboard", icon: <FiBarChart size={18} /> },
    { name: "새 아이디어", href: "/launcher/idea-submission", icon: <FiPlusCircle size={18} /> },
  ];

  return (
    <>
      <h2 className="text-lg font-semibold">Prelaunch Admin</h2>
      <Separator className="my-4" />
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn("w-full justify-start space-x-3 hover:bg-blue-100", {
                "bg-blue-600 text-white hover:bg-blue-600": pathname === item.href,
              })}
            >
              {item.icon}
              <span>{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <SignOutButton />
    </>
  );
}

function SignOutButton() {
  const supabase = createBrowserClient();
  const router = useRouter();

  const handleClick = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };
  return (
    <Button variant="outline" className="w-52 absolute bottom-4" onClick={handleClick}>
      <FiLogOut size={18} />
      <span>로그아웃</span>
    </Button>
  );
}
