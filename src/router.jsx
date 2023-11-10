import {createBrowserRouter} from "react-router-dom";
import Article from "./views/Article";
import Table from "./views/Table";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/article",
                element: <Article />
            },
            {
                path: "/article/:id",
                element: <Article key="view" />
            },
            {
                path: "/table",
                element: <Table />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;