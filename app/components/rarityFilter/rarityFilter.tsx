import { Rarity } from "@prisma/client";
import styles from "./rarityFilter.module.css";

function getEnumValues(enumObj: any): any[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Filter out the reverse mapping
    .map((key) => enumObj[key]);
}

export const rarityValues: Rarity[] = getEnumValues(Rarity);

interface ChildComponentProps {
  rarityFilter: Rarity[];
  setRarityFilter: React.Dispatch<React.SetStateAction<Rarity[]>>;
  extensionCode: string;
}
export default function RarityFilter({
  rarityFilter,
  setRarityFilter,
  extensionCode,
}: ChildComponentProps) {
  const toggle = (rarity: Rarity): void => {
    setRarityFilter((currentFilter) => {
      const newFilter = new Set(currentFilter);
      if (newFilter.has(rarity)) {
        newFilter.delete(rarity);
      } else {
        newFilter.add(rarity);
      }
      return Array.from(newFilter);
    });
  };

  return (
    <div className="flex content-center	justify-center mb-2	">
      <i
        onClick={() => toggle(Rarity.COMMON)}
        className={`ss ss-fw ss-${extensionCode.toLocaleLowerCase()} ss-common  ${styles.rarityFilter} ${rarityFilter.includes(Rarity.COMMON) ? styles.activeFilter : styles.notActiveFilter}`}
      ></i>
      <i
        onClick={() => toggle(Rarity.UNCOMMON)}
        className={`ss ss-fw ss-${extensionCode.toLocaleLowerCase()} ss-uncommon ${styles.rarityFilter} ${rarityFilter.includes(Rarity.UNCOMMON) ? styles.activeFilter : styles.notActiveFilter}`}
      ></i>
      <i
        onClick={() => toggle(Rarity.RARE)}
        className={`ss ss-fw ss-${extensionCode.toLocaleLowerCase()} ss-rare ${styles.rarityFilter} ${rarityFilter.includes(Rarity.RARE) ? styles.activeFilter : styles.notActiveFilter}`}
      ></i>
      <i
        onClick={() => toggle(Rarity.MYTHIC)}
        className={`ss ss-fw ss-${extensionCode.toLocaleLowerCase()} ss-mythic ${styles.rarityFilter} ${rarityFilter.includes(Rarity.MYTHIC) ? styles.activeFilter : styles.notActiveFilter}`}
      ></i>
    </div>
  );
}
