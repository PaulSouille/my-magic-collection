import { Button } from "@nextui-org/react";
interface InStockFilterProp {
  inStockFilter: boolean | null;
  setInStockFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
}
export default function InStockFilter({
  inStockFilter,
  setInStockFilter,
}: InStockFilterProp) {
  const toggleStock = () => {
    if (inStockFilter === null) {
      setInStockFilter(true);
      return;
    }
    if (inStockFilter === true) {
      setInStockFilter(false);
      return;
    }
    if (inStockFilter === false) {
      setInStockFilter(null);
      return;
    }
  };
  const getInStockLabel = () => {
    if (inStockFilter === null) {
      return "Both";
    }
    if (inStockFilter === true) {
      return "In stock";
    }
    if (inStockFilter === false) {
      return "Not in stock";
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          toggleStock();
        }}
      >
        {getInStockLabel()}
      </Button>
    </div>
  );
}
