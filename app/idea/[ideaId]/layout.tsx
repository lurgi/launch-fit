const getFetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export async function generateMetadata({ params }: { params: Promise<{ ideaId: string }> }) {
  const { ideaId } = await params;
  const { idea } = await getFetcher(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/publicIdea?ideaId=${ideaId}`);

  return {
    title: idea.title,
    description: idea.description,
    openGraph: {
      title: idea.title,
      description: idea.description,
    },
  };
}

export default function IdeaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
