"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import IdeaForm from "@/components/app/launcher/IdeaForm";
import useSWR, { mutate } from "swr";
import { useParams } from "next/navigation";
import StatsCard from "@/components/app/launcher/StatsCard";
import EmailListTable from "@/components/app/launcher/EmailListTable";
import { useToast } from "@/hooks/use-toast";
import CSVDownloadButton from "@/components/app/launcher/CSVDownloadButton";
import { EmailRecord, FeedbackRecord, IdeaStats } from "@prisma/client";
import LinkToIdeaButton from "@/components/app/launcher/LinkToIdeaButton";
import CopyButton from "@/components/common/CopyButton";
import FeedbackListTable from "@/components/app/launcher/FeedbackListTable";

interface Idea {
  id: string;
  title: string;
  emailText: string;
  website: string;
  description: string;

  stats: IdeaStats[];
  emails: EmailRecord[];
  feedbacks: FeedbackRecord[];

  createdAt: Date;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function IdeaDashboardPage() {
  const { ideaId } = useParams() as { ideaId: string };
  const { data } = useSWR<{ idea: Idea }>(`/api/idea?ideaId=${ideaId}`, fetcher);

  const { toast } = useToast();
  const handleSubmit = () => {
    const { dismiss } = toast({
      title: "아이디어가 수정되었습니다.",
      description: "아이디어가 수정되었습니다.",
    });
    setTimeout(() => {
      dismiss();
    }, 3000);
    mutate(`/api/idea?ideaId=${ideaId}`);
  };

  return (
    <>
      <LauncherSectionHeader title={data?.idea?.title} description={data?.idea?.description} />

      <Tabs defaultValue="overview" className="w-full h-4/5">
        <TabsList>
          <TabsTrigger value="overview">📊 개요</TabsTrigger>
          <TabsTrigger value="feedback">💬 피드백</TabsTrigger>
          <TabsTrigger value="edit">✏️ 수정</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <StatsCard stats={data?.idea?.stats} />
          <EmailListTable emails={data?.idea?.emails} />

          <div className="w-full flex justify-center gap-4 mt-6">
            <CopyButton copyText={`${process.env.NEXT_PUBLIC_APP_URL}/idea/${ideaId}`} innerText="링크 복사" />
            <LinkToIdeaButton ideaId={ideaId} />
            <CSVDownloadButton emails={data?.idea?.emails} />
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackListTable feedbacks={data?.idea?.feedbacks} />
        </TabsContent>

        <TabsContent value="edit">
          {data?.idea && (
            <IdeaForm method="update" onSubmit={handleSubmit} defaultValues={data?.idea} ideaId={ideaId} />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
