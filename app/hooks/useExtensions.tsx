import { Extensions } from "@prisma/client";
import { useEffect, useState } from "react";

const useExtensions = () => {
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
          () => extensionsWithBase64[0],
        );
        setExtensions(repeatedArray);
      })
      .catch((error) => {
        console.error("Error fetching extensions:", error);
        setLoading(false);
      });
  }, []);

  return { extensions, loading };
};

export default useExtensions;
