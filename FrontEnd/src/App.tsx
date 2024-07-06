import Layout from "./components/Layout/Layout"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Home from "./pages/Home/Home"
import Men, { loader as menLoader } from "./pages/Men"
import Woman from "./pages/Woman"
import Children from "./pages/Children"
import Login from "./pages/Login"
import Favorites from "./pages/Favorites"
import About from "./pages/About"
import Sale from "./pages/Sale"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="men" element={<Men />} loader={menLoader} />
      <Route path="woman" element={<Woman />} />
      <Route path="children" element={<Children />} />
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
