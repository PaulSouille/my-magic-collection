"use client";

import { Skeleton } from "@nextui-org/skeleton";

export default function CardsSkeleton() {
  const total = 20; // Define the total number of skeleton elements

  return (
    <div className="grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="w-[325px] h-[400px] space-y-5 p-4">
          <Skeleton className="rounded-lg">
            <div className="h-[400px] rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}
