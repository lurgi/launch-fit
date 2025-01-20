import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FiUsers, FiMail, FiBarChart } from "react-icons/fi";

interface IdeaStats {
  id: string;
  date: Date;
  visits: number;
  emailCount: number;
}

interface StatsProps {
  stats?: IdeaStats[];
}

export default function StatsCard({ stats }: StatsProps) {
  const visitors = stats?.reduce((acc, curr) => acc + curr.visits, 0);
  const registrations = stats?.reduce((acc, curr) => acc + curr.emailCount, 0);
  const conversionRate = registrations && visitors ? ((registrations / visitors) * 100).toFixed(2) : 0;

  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  useEffect(() => {
    setIsShowSkeleton(true);
  }, []);

  return (
    <Card className="w-full p-4 text-center shadow-lg">
      <CardContent className="grid grid-cols-3 gap-6 items-center p-4">
        {/* 방문자 수 */}
        <div className="flex flex-col items-center">
          <FiUsers className="text-blue-600 text-3xl mb-1" />
          <p className="text-lg font-semibold">방문자</p>
          <p
            className={cn(
              "text-2xl font-bold text-blue-600 h-8 ",
              !stats && isShowSkeleton && "skeleton animate-pulse bg-gray-200 px-4 rounded-md"
            )}
          >
            {stats && visitors}
          </p>
        </div>

        {/* 이메일 등록 수 */}
        <div className="flex flex-col items-center">
          <FiMail className="text-amber-500 text-3xl mb-1 h-8" />
          <p className="text-lg font-semibold">이메일 등록</p>
          <p
            className={cn(
              "text-2xl font-bold text-amber-500 h-8 ",
              !stats && isShowSkeleton && "skeleton animate-pulse bg-gray-200 px-4 rounded-md"
            )}
          >
            {stats && registrations}
          </p>
        </div>

        {/* 전환율 */}
        <div className="flex flex-col items-center">
          <FiBarChart className="text-green-600 text-3xl mb-1 h-8" />
          <p className="text-lg font-semibold">전환율</p>
          <p
            className={cn(
              "text-2xl font-bold text-green-600 h-8",
              !stats && isShowSkeleton && "skeleton animate-pulse bg-gray-200 px-4 rounded-md"
            )}
          >
            {stats && `${conversionRate}%`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
