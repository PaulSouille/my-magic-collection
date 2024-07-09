import { Checkbox } from "@nextui-org/react";

interface InStockProp {
  inStock: boolean;
  setInStock: React.Dispatch<React.SetStateAction<boolean>>;
  notInStock: boolean;
  setNotInStock: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function InStockFilter({
  inStock,
  setInStock,
  notInStock,
  setNotInStock,
}: InStockProp) {
  const toggleInStock = (state: boolean) => {
    setInStock(state);
  };

  const toggleNotInStock = (state: boolean) => {
    setNotInStock(state);
  };

  return (
    <div className="flex flex-col	">
      <Checkbox
        isSelected={inStock}
        onChange={(e) => toggleInStock(e.target.checked)}
      >
        In stock
      </Checkbox>
      <Checkbox
        isSelected={notInStock}
        onChange={(e) => toggleNotInStock(e.target.checked)}
      >
        Not in stock
      </Checkbox>
    </div>
  );
}
