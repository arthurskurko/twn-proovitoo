import { Outlet } from "react-router-dom";
import Aside from "./Aside";

export default function DefaultLayout() {
    return (
        <div>
            <div>
                <Aside />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}