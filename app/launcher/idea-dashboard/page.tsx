"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { FiPlusCircle, FiArrowRight } from "react-icons/fi";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import useSWR from "swr";

interface Idea {
  id: string;
  title: string;
  createdAt: Date;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default function IdeasPage() {
  const { data, isLoading } = useSWR<{ ideas: Idea[] }>("/api/ideas", fetcher);

  return (
    <>
      <LauncherSectionHeader
        title="📊 관리자 대시보드"
        description="이메일 등록 수 및 방문자 데이터를 확인하고 아이디어 정보를 수정하세요."
      />

      <div className="w-full space-y-4">
        <Card className="border-none shadow-none w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">내 아이디어 목록</CardTitle>
          </CardHeader>

          <CardContent>
            {isLoading || data?.ideas.length !== 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {isLoading ? <IdeaSkeletonContent /> : <IdeasContent ideas={data?.ideas} />}
              </div>
            ) : (
              <NoIdeasContent />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function IdeaSkeletonContent() {
  return Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="block p-4 border border-gray-300 rounded-lg shadow-sm transition-all skeleton-loading animate-pulse"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold text-gray-900 bg-gray-300 h-4 w-16 rounded"></div>
          <p className="text-sm text-gray-500 bg-gray-200 h-3 w-24 rounded mt-2"></p>
        </div>
        <FiArrowRight className="text-gray-500" size={20} />
      </div>
    </div>
  ));
}

function IdeasContent({ ideas }: { ideas: Idea[] | undefined }) {
  if (!ideas) return <div>Something went wrong</div>;

  return (
    <>
      {ideas.map((idea) => (
        <Link
          key={idea.id}
          href={`/launcher/idea-dashboard/${idea.id}`}
          className="block p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{idea.title}</div>
              <p className="text-sm text-gray-500">{format(idea.createdAt, "yyyy-MM-dd")}</p>
            </div>
            <FiArrowRight className="text-gray-500" size={20} />
          </div>
        </Link>
      ))}
      <Link
        href="/launcher/idea-submission"
        className="flex justify-center items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <FiPlusCircle size={20} className="text-gray-500 mr-2 " />
        <div className="text-lg font-semibold text-gray-900">새 아이디어 등록</div>
      </Link>
    </>
  );
}

function NoIdeasContent() {
  return (
    <CardContent>
      <div className="flex flex-col items-center text-center py-10">
        <FiPlusCircle size={48} className="text-gray-400" />
        <p className="mt-2 text-gray-500 text-lg font-semibold">등록된 아이디어가 없습니다.</p>
        <Link href="/launcher/idea-submission">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md">
            새 아이디어 등록하기
          </button>
        </Link>
      </div>
    </CardContent>
  );
}
