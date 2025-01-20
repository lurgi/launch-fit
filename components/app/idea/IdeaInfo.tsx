import { cn } from "@/lib/utils";

export default function IdeaInfo({ title, description }: { title?: string; description?: string }) {
  return (
    <section className="w-full max-w-2xl text-center">
      <h1
        className={cn("text-3xl font-bold sm:text-4xl ", !title && "bg-gray-200 animate-pulse h-10")}
        style={{ wordBreak: "keep-all" }}
      >
        {title && title}
      </h1>
      <p className={cn("mt-4 text-lg text-gray-600 ", !description && "bg-gray-200 animate-pulse h-7")}>
        {description && description}
      </p>
    </section>
  );
}
