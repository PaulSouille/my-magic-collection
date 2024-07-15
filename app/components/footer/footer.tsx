import { Link } from "@nextui-org/react";
import styles from "./footer.module.css";

export default function Footer() {
  {
    return (
      <div
        className={`${styles.footerBorder} flex justify-between h-16 content-center flex-wrap`}
      >
        <div className="grow basis-0 flex justify-center	flex-wrap content-center h-full	">
          <div></div>
        </div>
        <div className="h-full  flex-wrap content-center	">
          Made with ❤️ by
          <Link target="_blank" className="ml-1" href="https://paulsouille.fr">
            Paul Souillé
          </Link>
        </div>
        <div className="grow basis-0	flex	justify-center flex-wrap content-center h-full">
          <div>{process.env.NEXT_PUBLIC_VERSION}</div>
        </div>
      </div>
    );
  }
}
