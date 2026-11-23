"use client";

import Image from "next/image";
import { useState } from "react";

export function Avatar({
  src,
  name,
  className = "",
}: {
  src: string | null;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("");

  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}>
      {src && !failed ? (
        <Image
          src={src}
          alt={`Portrait of ${name}`}
          fill
          sizes="160px"
          unoptimized
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="grid h-full w-full place-items-center bg-pine-100 font-display text-xl font-semibold text-pine-800">
          {initials}
        </span>
      )}
    </span>
  );
}
