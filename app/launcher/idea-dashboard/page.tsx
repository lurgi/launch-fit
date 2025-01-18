"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Chart from "@/components/common/Chart";

export default function IdeaDashboardPage() {
  const [registrations] = useState(128);
  const [visitors] = useState(540);
  const conversionRate = ((registrations / visitors) * 100).toFixed(2);
  const [ideaTitle, setIdeaTitle] = useState("혁신적인 노트 앱");
  const [ideaDescription, setIdeaDescription] = useState(
    "이 노트 앱은 단순한 기록을 넘어, 사용자의 메모를 자동으로 정리하고 필요한 정보를 추천해 주는 AI 기반의 스마트 노트 솔루션입니다."
  );

  const handleDownloadCSV = () => {
    // TODO: 다운로드 기능 구현
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 px-6">
      <section className="w-full max-w-3xl text-center py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">📊 관리자 대시보드</h1>
        <p className="mt-4 text-lg text-gray-600">
          이메일 등록 수 및 방문자 데이터를 확인하고 아이디어 정보를 수정하세요.
        </p>
      </section>

      {/* 탭 네비게이션 */}
      <Tabs defaultValue="overview" className="w-full max-w-3xl h-4/5">
        <TabsList>
          <TabsTrigger value="overview">📊 개요</TabsTrigger>
          <TabsTrigger value="edit">✏️ 수정</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="w-full bg-zinc-100 p-6 rounded-lg shadow-md text-center">
            <p className="text-xl font-bold">
              총 방문자 수: <span className="text-blue-600">{visitors}</span>
            </p>
            <p className="text-xl font-bold mt-2">
              이메일 등록 수: <span className="text-amber-500">{registrations}</span>
            </p>
            <p className="text-xl font-bold mt-2">
              전환율: <span className="text-green-600">{conversionRate}%</span>
            </p>
          </div>
          <div className="w-full mt-6">
            <Chart />
          </div>
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
          <form className="w-full bg-zinc-100 p-6 rounded-lg shadow-md">
            <label className="block text-gray-700 font-medium">💡 아이디어 제목</label>
            <Input
              type="text"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg"
            />

            <label className="block text-gray-700 font-medium mt-4">📝 아이디어 설명</label>
            <textarea
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              className="mt-2 w-full p-3 border border-zinc-300 rounded-lg h-24"
            ></textarea>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md mt-4">
              변경 사항 저장
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
