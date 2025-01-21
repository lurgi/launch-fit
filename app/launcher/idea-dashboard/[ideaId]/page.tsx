"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import IdeaForm from "@/components/app/launcher/IdeaForm";
import useSWR, { mutate } from "swr";
import { useParams } from "next/navigation";
import StatsCard from "@/components/app/launcher/StatsCard";
import EmailListTable from "@/components/app/launcher/EmailListTable";
import { generateAndDownloadCSV } from "@/lib/utils";
import { formatDate } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface IdeaStats {
  id: string;
  date: Date;
  visits: number;
  emailCount: number;
}

interface EmailRecord {
  id: string;
  email: string;
  createdAt: Date;
}

interface Idea {
  id: string;
  title: string;
  emailText: string;
  website: string;
  description: string;

  stats: IdeaStats[];
  emails: EmailRecord[];

  createdAt: Date;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function IdeaDashboardPage() {
  const { ideaId } = useParams() as { ideaId: string };
  const { data } = useSWR<{ idea: Idea }>(`/api/idea?ideaId=${ideaId}`, fetcher);
  const emails = data?.idea?.emails;

  const handleDownloadCSV = () => {
    if (emails) {
      generateAndDownloadCSV(
        [
          ["email", "createdAt"],
          ...emails.map((emailRecord) => [emailRecord.email, formatDate(emailRecord.createdAt, "yyyy-MM-dd")]),
        ],
        `emails-${new Date().getTime()}`
      );
    }
  };

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
          <TabsTrigger value="edit">✏️ 수정</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <StatsCard stats={data?.idea?.stats} />
          <EmailListTable emails={emails} />

          <div className="w-full text-center mt-6">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
              onClick={handleDownloadCSV}
            >
              📥 CSV 다운로드
            </Button>
          </div>
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
