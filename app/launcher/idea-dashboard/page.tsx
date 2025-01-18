"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
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

      <Card className="w-full">
        <CardHeader>
          <CardTitle>내 아이디어 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-3/4">제목</TableHead>
                <TableHead className="w-1/4">등록 날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ideas.length > 0 ? (
                ideas.map((idea) => (
                  <TableRow key={idea.id} className="hover:bg-blue-100">
                    <TableCell>
                      <Link
                        href={`/launcher/idea-dashboard/${idea.id}`}
                        className="w-full hover:underline inline-block"
                      >
                        {idea.title}
                      </Link>
                    </TableCell>
                    <TableCell>{format(idea.createdAt, "yyyy-MM-dd")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    <Link href="/launcher/idea-submission">
                      <div className="flex flex-col items-center p-2 text-lg font-semibold">
                        <FiPlusCircle size={32} />
                        <span className="text-gray-500">등록된 아이디어가 없습니다.</span>
                        <span className="text-gray-500">새 아이디어 등록하기</span>
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
