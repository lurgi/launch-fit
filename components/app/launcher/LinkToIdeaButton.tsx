import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface LinkToIdeaButtonProps {
  ideaId: string;
}

export default function LinkToIdeaButton({ ideaId }: LinkToIdeaButtonProps) {
  return (
    <Link href={`/idea/${ideaId}`} target="_blank">
      <Button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg">
        <ArrowRightIcon className="w-6 h-6" />
        바로 가기
      </Button>
    </Link>
  );
}
