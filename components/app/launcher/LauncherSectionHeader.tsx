import { cn } from "@/lib/utils";

interface LauncherSectionHeaderProps {
  title?: string;
  description?: string;
}

export default function LauncherSectionHeader({ title, description }: LauncherSectionHeaderProps) {
  return (
    <section className="w-full max-w-2xl text-center py-12">
      <h1 className={cn("text-3xl font-bold sm:text-4xl flex-1", title || "bg-gray-200 animate-pulse")}>{title}</h1>
      <div className="mt-4 text-lg text-gray-600">{description}</div>
    </section>
  );
}
