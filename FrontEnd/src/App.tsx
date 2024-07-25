import Layout from "./components/Layout/Layout"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Home from "./pages/Home/Home"
import Men, { loader as menLoader } from "./pages/Men/Men"
import MenDetail, {
  loader as menDetailLoader,
} from "./pages/MenDetail/MenDetail"
import Woman from "./pages/Woman"
import Children from "./pages/Children"
import Login, { action as loginAction } from "./pages/Login/Login"
import Favorites from "./pages/Favorites"
import About from "./pages/About"
import Sale from "./pages/Sale"
import CartProvider from "./context/CartContext"
import Error from "./pages/Error/Error"
import AuthContextProvider from "./context/AuthContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="men" element={<Men />} loader={menLoader} />
      <Route path="men/:id" element={<MenDetail />} loader={menDetailLoader} />
      <Route path="woman" element={<Woman />} />
      <Route path="children" element={<Children />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="about" element={<About />} />
      <Route path="sale" element={<Sale />} />
    </Route>
  )
)

function App() {
  return (
    <CartProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </CartProvider>
  )
}

export default App
