"use client";
import { Extensions } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Card, Link } from "@nextui-org/react";
import ExtensionSkeleton from "./components/skeleton/extension";
import { Image } from "@nextui-org/image";

export default function Home() {
  const [extensions, setExtensions] = useState<Extensions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/extensions")
      .then((response) => response.json())
      .then((data) => {
        const extensionsWithBase64 = data.map((extension: Extensions) => ({
          ...extension,
          image: Buffer.from(extension.image!).toString("base64"),
        }));
        setExtensions(extensionsWithBase64);
        setLoading(false);
        const repeatedArray = Array.from(
          { length: 10 },
          () => extensionsWithBase64[0]
        );
        setExtensions(repeatedArray);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <ExtensionSkeleton></ExtensionSkeleton>;

  return (
    <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {extensions.map((extension) => (
        <div key={extension.id}>
          <Link href={`/cards/${extension.id}`}>
            <Image
              isZoomed
              width={300}
              alt={`${extension.name}'s image`}
              src={`data:image/png;base64,${extension.image}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
