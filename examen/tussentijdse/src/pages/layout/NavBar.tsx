import {NavLink} from "react-router-dom";
import styles from './App.module.css';
export function Nav() {
    return (
        <nav >
            <NavLink className={({isActive}) => isActive ? styles.activeNavLink : styles.navLink} to="/1">Oefening1</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeNavLink : styles.navLink} to="/2">oefening2</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeNavLink : styles.navLink} to="/3">oefening3</NavLink>
        </nav>
    )
}
