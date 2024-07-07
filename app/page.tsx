"use client";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/react";
import ExtensionSkeleton from "./components/skeleton/extension";
import useExtensions from "./hooks/useExtensions";

export default function Home() {
  const { extensions, loading } = useExtensions();

  if (loading) return <ExtensionSkeleton></ExtensionSkeleton>;

  return (
    <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {extensions.map((extension) => (
        <div key={extension.id}>
          <Link href={`/extensions/${extension.code}/cards`}>
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
