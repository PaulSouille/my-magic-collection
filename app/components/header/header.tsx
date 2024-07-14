import { Link } from "@nextui-org/react";
import { ThemeSwitch } from "../themeSwitcher";
import styles from "./header.module.css";

export default function Header() {
  {
    return (
      <div
        className={`${styles.borderTest} flex justify-between h-16 content-center flex-wrap`}
      >
        <div className="grow basis-0 flex justify-center	flex-wrap content-center h-full	">
          <Link isBlock className=" font-semibold" href="/">
            <div className="text-2xl">🌹</div>
          </Link>
        </div>
        <div className="h-full  flex-wrap content-center	">
          <Link isBlock className=" font-semibold" href="/">
            My magic collection
          </Link>
        </div>
        <div className="grow basis-0	flex	justify-center flex-wrap content-center h-full">
          <ThemeSwitch></ThemeSwitch>
        </div>
      </div>
    );
  }
}
