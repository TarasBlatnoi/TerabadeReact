import Layout from "./components/Layout/Layout"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Login from "./pages/Login"
import Favorites from "./pages/Favorites"
import About from "./pages/About"
import Sale from "./pages/Sale"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="catalog" element={<Catalog />} />
      <Route path="login" element={<Login />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="about" element={<About />} />
      <Route path="sale" element={<Sale />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
