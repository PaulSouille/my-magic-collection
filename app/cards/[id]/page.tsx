"use client";
import SearchBar from "@/app/components/searchbar";
import useCards from "@/app/hooks/useCards";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const CardDetail = () => {
  const { id }: { id: string } = useParams();
  const page = 1;
  const pageSize = 20;

  let { data, loading } = useCards(id, page, pageSize);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SearchBar />
      <div className=" grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data!.cards.map((card) => (
          <div key={card.id}>
            <Link href={`/cards/${card.id}`}>
              <Image
                isZoomed
                width={300}
                alt={`${card.name}'s image`}
                src={`data:image/png;base64,${card.smallImage}`}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex content-center	justify-center	mb-5 mt-5">
        <Button>Load more</Button>
      </div>
    </div>
  );
};

export default CardDetail;

// const initialPage = 1;
// const pageSize = 20;

// const [page, setPage] = useState(initialPage);
// const [cards, setCards] = useState([]);
// const { data, loading } = useCards(id, page, pageSize);

// useEffect(() => {
//   if (data && data.cards) {

//     setCards((prevCards) => [...prevCards, ...data.cards]);
//   }
// }, [data]);

// const loadMoreCards = () => {
//   setPage((prevPage) => prevPage + 1);
// };

// if (loading && page === initialPage) {
//   return <p>Loading...</p>;
// }        <Button onPress={loadMoreCards} disabled={loading}>
// {loading ? "Loading..." : "Load more"}
// </Button>
