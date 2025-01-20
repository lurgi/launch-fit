"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

export default function CopyButton({ copyText, innerText }: { copyText: string; innerText: string }) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      className="mt-3 bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-lg"
      onClick={() => {
        navigator.clipboard.writeText(copyText);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}
    >
      {isCopied ? <CheckIcon className="w-6 h-6" /> : <CopyIcon className="w-6 h-6" />}
      {innerText}
    </Button>
  );
}
