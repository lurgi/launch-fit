import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface LinkToIdeaButtonProps {
  ideaId: string;
}

export default function LinkToIdeaButton({ ideaId }: LinkToIdeaButtonProps) {
  return (
    <Link href={`/idea/${ideaId}`} target="_blank">
      <div className="flex items-center justify-center gap-2 h-9 bg-amber-500 hover:bg-amber-600 text-white rounded-lg">
        <ArrowRightIcon className="w-6 h-6" />
        바로 가기
      </div>
    </Link>
  );
}
