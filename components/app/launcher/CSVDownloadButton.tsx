import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateAndDownloadCSV } from "@/lib/utils";
import { EmailRecord } from "@prisma/client";
import { formatDate } from "date-fns";
import React from "react";

export default function CSVDownloadButton({ emails }: { emails?: EmailRecord[] }) {
  const { toast } = useToast();

  const handleDownloadCSV = () => {
    if (emails && emails.length > 0) {
      generateAndDownloadCSV(
        [
          ["email", "createdAt"],
          ...emails.map((emailRecord) => [emailRecord.email, formatDate(emailRecord.createdAt, "yyyy-MM-dd")]),
        ],
        `emails-${new Date().getTime()}`
      );
    }
    if (emails && emails.length === 0) {
      toast({
        title: "이메일이 없습니다.",
        description: "등록된 이메일이 없습니다.",
        variant: "destructive",
      });
    }
  };
  return (
    <Button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg" onClick={handleDownloadCSV}>
      📥 CSV 다운로드
    </Button>
  );
}
