import { cn } from "@/lib/utils";

export default function LauncherSectionHeader({ title, description }: { title?: string; description?: string }) {
  return (
    <section className="w-full max-w-2xl text-center py-12">
      <h1 className={cn("text-3xl font-bold sm:text-4xl min-h-10", title || "bg-gray-200 animate-pulse")}>{title}</h1>
      <p
        className={cn(
          "mt-4 text-lg text-gray-600 min-h-6 max-h-32 overflow-y-hidden line-clamp-4",
          description || "bg-gray-200 animate-pulse"
        )}
      >
        {description}
      </p>
    </section>
  );
}
