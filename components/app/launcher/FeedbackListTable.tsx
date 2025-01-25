import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FeedbackRecord } from "@prisma/client";
import { format } from "date-fns";

export default function FeedbackListTable({ feedbacks }: { feedbacks?: FeedbackRecord[] }) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">💬 피드백 리스트</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-4 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/3 text-center">피드백 내용</TableHead>
              <TableHead className="w-1/3 text-center">작성 날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks && feedbacks.length > 0 ? (
              feedbacks.map(({ id, createdAt, feedback }) => (
                <TableRow key={id} className="hover:bg-gray-100">
                  <TableCell className="text-gray-800">{feedback}</TableCell>
                  <TableCell className="text-center text-gray-600">
                    {format(new Date(createdAt), "yyyy-MM-dd")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-500 py-6">
                  작성된 피드백이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
