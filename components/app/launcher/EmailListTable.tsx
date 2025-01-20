import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface EmailEntry {
  id: string;
  email: string;
  createdAt: Date;
}

interface EmailListTableProps {
  emails?: EmailEntry[];
}

export default function EmailListTable({ emails }: EmailListTableProps) {
  return (
    <Card className="w-full shadow-lg max-h-[400px] overflow-y-auto">
      <CardContent className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/3">이메일 주소</TableHead>
              <TableHead className="w-1/3 text-center">등록 날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails && emails.length > 0 ? (
              emails.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-100">
                  <TableCell className="text-gray-800">{entry.email}</TableCell>
                  <TableCell className="text-center text-gray-600">{format(entry.createdAt, "yyyy-MM-dd")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-500 py-6">
                  등록된 이메일이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
