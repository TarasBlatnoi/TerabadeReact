import Layout from "./components/Layout/Layout"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { lazy, Suspense } from "react"
import Home from "./pages/Home/Home"
import DetailProduct, {
  loader as DetailProductLoader,
} from "./pages/DetailProduct/DetailProduct"
const Login = lazy(() => import("./pages/Login/Login"))
import Favorites from "./pages/Favorites/Favorites"
import About from "./pages/About"
import Sale from "./pages/Sale"
import CartProvider from "./context/CartContext"
import Error from "./pages/Error/Error"
import AuthContextProvider from "./context/AuthContext"
import checkAuthLoader from "./utils/checkAuthLoader"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api/queryClient"
import ProductsLayout from "./pages/ProductsLayout/ProductsLayout"
import Products from "./pages/Products/Products"
import { womenLoader, menLoader, childrenLoader } from "./utils/loaders"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />

      <Route element={<ProductsLayout />}>
        <Route path="men" id="men" loader={menLoader}>
          <Route index element={<Products parentRouteId="men" />} />
          <Route
            path=":id"
            element={<DetailProduct parentRouteId="men" />}
            loader={DetailProductLoader}
          />
        </Route>
        <Route path="women" id="women" loader={womenLoader}>
          <Route index element={<Products parentRouteId="women" />} />
          <Route
            path=":id"
            element={<DetailProduct parentRouteId="women" />}
            loader={DetailProductLoader}
          />
        </Route>
        <Route path="children" id="children" loader={childrenLoader}>
          <Route index element={<Products parentRouteId="children" />} />
          <Route
            path=":id"
            element={<DetailProduct parentRouteId="children" />}
            loader={DetailProductLoader}
          />
        </Route>
      </Route>

      <Route
        path="login"
        element={
          <Suspense fallback={<p>Loading login page...</p>}>
            <Login />
          </Suspense>
        }
        action={(meta) =>
          import("./pages/Login/Login").then((module) => module.action(meta))
        }
      />
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
