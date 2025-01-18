"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Chart from "@/components/common/Chart";
import LauncherSectionHeader from "@/components/app/launcher/LauncherSectionHeader";
import IdeaForm from "@/components/app/launcher/IdeaForm";

export default function IdeaDashboardPage() {
  const [registrations] = useState(128);
  const [visitors] = useState(540);
  const conversionRate = ((registrations / visitors) * 100).toFixed(2);
  const [title] = useState("혁신적인 노트 앱");
  const [description] = useState(
    "이 노트 앱은 단순한 기록을 넘어, 사용자의 메모를 자동으로 정리하고 필요한 정보를 추천해 주는 AI 기반의 스마트 노트 솔루션입니다."
  );
  const [emailText] = useState("이메일 등록하기");
  const [website] = useState("https://www.example.com");

  const handleDownloadCSV = () => {
    // TODO: 다운로드 기능 구현
  };

  return (
    <>
      <LauncherSectionHeader
        title={`📊 ${title} 대시보드`}
        description="이메일 등록 수 및 방문자 데이터를 확인하고 아이디어 정보를 수정하세요."
      />
      <Tabs defaultValue="overview" className="w-full h-4/5">
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
          <IdeaForm onSubmit={() => {}} defaultValues={{ title, description, emailText, website }} />
        </TabsContent>
      </Tabs>
    </>
  );
}
