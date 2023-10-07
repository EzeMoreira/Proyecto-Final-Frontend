import { Home } from "../../pages/Home";
import { Error404 } from "../../pages/Error404";
import { About } from "../../pages/About";
import { Administrator } from "../../pages/Administrator";
import { Menu } from "../../pages/Menu";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register"

export const routes =  [
     { path:"/about", element:<About />},
     { path:"/Login", element:<Login />},
     { path:"/", element: <Home /> },
     { path:"*", element:<Error404 />},
     { path:"/Menu", element:<Menu />},
     { path:"/Register", element:<Register />},
     { path:"/administrator", element:<Administrator />}
]