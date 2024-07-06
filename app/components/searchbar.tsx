import { Input } from "@nextui-org/react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { SearchIcon } from "./icons/search-icon";

interface ChildComponentProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchBar({ setSearch }: ChildComponentProps) {
  const debouncedSetValue = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [],
  );

  const handleChange = (e: any) => {
    debouncedSetValue(e);
  };

  const clear = () => {
    setSearch("");
  };
  return (
    <div className="flex content-center	justify-center	mb-5">
      <Input
        onValueChange={handleChange}
        onClear={clear}
        classNames={{
          base: "max-w-full sm:max-w-[36rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Gandalf, Sauron, Saruman..."
        size="sm"
        startContent={<SearchIcon size={18} />}
      />
    </div>
  );
}
