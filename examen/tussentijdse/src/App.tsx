import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Oefening1} from "./pages/Oefening1/Oefening1.tsx";
import {DuckieDetail, Oefenign2} from "./pages/Oefening2/Oefening2.tsx";
import {Oefenign3} from "./pages/Oefening3/Oefening3.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {Header} from "./pages/layout/Header.tsx";
import {Footer} from "./pages/layout/Footer.tsx";


export const Root = () => {
    return (
        <>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/1",
                element: <Oefening1/>
            },
            {
                path: "/2",
                element: <Oefenign2/>
            },
            {
                path: "/3",
                element: <Oefenign3 />
            },
            {
                path: '/:name',
                element: <DuckieDetail/>
            }
        ]
    }
]);
function App() {
    return(
        <RouterProvider router={router}/>
    )

}

export default App;
