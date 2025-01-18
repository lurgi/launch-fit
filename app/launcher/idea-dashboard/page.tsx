"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { FiPlusCircle, FiArrowRight } from "react-icons/fi";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";

interface Idea {
  id: string;
  title: string;
  createdAt: Date;
}

export default function IdeasPage() {
  const [ideas] = useState<Idea[]>([
    { id: "1", title: "AI 기반 요가복 추천 시스템", createdAt: new Date("2024-01-15") },
    { id: "2", title: "맞춤형 다이어트 플랜 앱", createdAt: new Date("2024-02-01") },
    { id: "3", title: "친환경 재사용 용기 배달 서비스", createdAt: new Date("2024-02-10") },
  ]);

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
            {ideas.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {ideas.map((idea) => (
                  <Link
                    key={idea.id}
                    href={`/launcher/idea-dashboard/${idea.id}`}
                    className="block p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{idea.title}</h3>
                        <p className="text-sm text-gray-500">{format(idea.createdAt, "yyyy-MM-dd")}</p>
                      </div>
                      <FiArrowRight className="text-gray-500" size={20} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-10">
                <FiPlusCircle size={48} className="text-gray-400" />
                <p className="mt-2 text-gray-500 text-lg font-semibold">등록된 아이디어가 없습니다.</p>
                <Link href="/launcher/idea-submission">
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md">
                    새 아이디어 등록하기
                  </button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
