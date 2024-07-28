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
import Favorites from "./pages/Favorites/Favorites"
import About from "./pages/About"
import Sale from "./pages/Sale"
import CartProvider from "./context/CartContext"
import Error from "./pages/Error/Error"
import AuthContextProvider from "./context/AuthContext"
import checkAuthLoader from "./utils/checkAuthLoader"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api/queryClient"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route id="men" path="/men" loader={menLoader}>
        <Route index element={<Men />} />
        <Route path=":id" element={<MenDetail />} loader={menDetailLoader} />
      </Route>
      <Route path="woman" element={<Woman />} />
      <Route path="children" element={<Children />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route
        path="favorites"
        element={<Favorites />}
        loader={checkAuthLoader}
      />
      <Route path="about" element={<About />} />
      <Route path="sale" element={<Sale />} />
    </Route>
  )
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
