import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface LinkToIdeaButtonProps {
  ideaId: string;
}

export default function LinkToIdeaButton({ ideaId }: LinkToIdeaButtonProps) {
  return (
    <Link
      href={`/idea/${ideaId}`}
      target="_blank"
      className="flex items-center justify-center gap-2 h-9 py-2 px-6 bg-amber-500 hover:bg-amber-600 text-sm text-white rounded-lg"
    >
      <ArrowRightIcon className="w-6 h-6 p-[1px]" />
      바로 가기
    </Link>
  );
}
