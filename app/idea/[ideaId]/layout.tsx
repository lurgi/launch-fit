import { Idea } from "@prisma/client";
import { NextResponse } from "next/server";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const getFetchIdeaByIdeaId = async (ideaId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/publicIdea?ideaId=${ideaId}`);
  return response.json() as Promise<{ isError: boolean; idea: Idea }>;
};

export async function generateMetadata({ params }: { params: Promise<{ ideaId: string }> }) {
  const { ideaId } = await params;
  const { idea } = await getFetchIdeaByIdeaId(ideaId);

  return {
    title: idea.title,
    description: idea.description,
    openGraph: {
      title: idea.title,
      description: idea.description,
    },
  };
}

interface IdeaLayoutProps extends PropsWithChildren {
  params: Promise<{ ideaId: string }>;
}

export default async function IdeaLayout({ params, children }: IdeaLayoutProps) {
  const { ideaId } = await params;
  const { idea, isError } = await getFetchIdeaByIdeaId(ideaId);

  if (!idea || isError) {
    return NextResponse.redirect(new URL("/404"));
  }

  return <SWRConfig value={{ fallback: { idea } }}>{children}</SWRConfig>;
}
