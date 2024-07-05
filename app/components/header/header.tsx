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
          <div>Logo</div>
        </div>
        <div className="h-full  flex-wrap content-center	">
          <Link className="text-secondary-500 font-semibold" href="/">
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
