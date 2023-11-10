import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faArchive } from '@fortawesome/free-solid-svg-icons'

export default function Aside() {
    return (
        <div>
            <aside>
                <img className="logo" src="/src/assets/logo.svg" alt="" />
                <NavLink
                    to="/article"
                >Artikkel<FontAwesomeIcon icon={faArchive} /></NavLink>
                <NavLink
                    to="/table"
                >Tabel<FontAwesomeIcon icon={faTable} /></NavLink>
            </aside>
        </div>
    )
}