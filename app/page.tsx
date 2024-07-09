"use client";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ExtensionSkeleton from "./components/skeleton/extensions";
import useExtensions from "./hooks/useExtensions";
import { countExtensionStock } from "./service/cardsService";

type StockCounts = {
  [key: string]: string;
};

export default function Home() {
  const { extensions, loading } = useExtensions();
  const [stockCounts, setStockCounts] = useState<StockCounts>({});

  useEffect(() => {
    if (extensions.length > 0) {
      const fetchStockCounts = async () => {
        const counts: StockCounts = {};
        for (const extension of extensions) {
          const data = await countExtensionStock(extension.code);
          counts[extension.code] =
            `${data!.totalCardsInStock}/${data!.totalCards}`;
        }
        setStockCounts(counts);
      };

      fetchStockCounts();
    }
  }, [extensions]);

  if (loading) return <ExtensionSkeleton />;

  return (
    <div className="grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <div className="flex content-center justify-center font-semibold">
            {stockCounts[extension.code] || "Loading..."}
          </div>
        </div>
      ))}
    </div>
  );
}
