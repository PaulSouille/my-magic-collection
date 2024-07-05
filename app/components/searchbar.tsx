import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons/search-icon";

export default function SearchBar() {
  {
    return (
      <div className="flex content-center	justify-center	mb-5">
        <Input
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
          type="search"
        />
      </div>
    );
  }
}
