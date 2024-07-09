"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/react";

export default function ExtensionSkeleton() {
  return (
    <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="w-[300px] space-y-5 p-4">
        <Skeleton className="rounded-lg">
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}
