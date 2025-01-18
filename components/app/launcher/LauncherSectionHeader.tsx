export default function LauncherSectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="w-full max-w-2xl text-center py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </section>
  );
}
