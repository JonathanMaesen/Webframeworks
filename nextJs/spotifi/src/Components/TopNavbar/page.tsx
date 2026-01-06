import Link from "next/link"
import style from "./page.module.css"
import {NavLinkProps} from "@/interfaces";

export default function TopNavBar() {
    return(
        <nav className={style.nav}>
            <ul className={style.ul}>
                <li className={style.li}>
                    <NavLink href={"/home"} label={"Home"}/>
                </li>
                <li className={style.li}>
                    <NavLink href={"/store"} label={"Store"}/>
                </li>
            </ul>
        </nav>
    )
}

function NavLink({href, label}:NavLinkProps) {
    return(
        <Link href={href} className={style.link}>
            {label}
        </Link>
    )
}