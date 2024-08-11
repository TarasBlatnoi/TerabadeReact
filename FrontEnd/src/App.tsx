import Layout from "./components/Layout/Layout"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom"
import { lazy, Suspense } from "react"
import Home from "./pages/Home/Home"
import DetailProduct from "./pages/DetailProduct/DetailProduct"
const Login = lazy(() => import("./pages/Login/Login"))
import Favorites from "./pages/Favorites/Favorites"
import About from "./pages/About"
import Sale from "./pages/Sale"
import CartProvider from "./context/CartContext"
import Error from "./pages/Error/Error"
import AuthContextProvider from "./context/AuthContext"
import checkAuthLoader from "./utils/checkAuthLoader"
import { QueryClientProvider } from "react-query"
import { queryClient } from "./api/queryClient"
import ProductsLayout from "./pages/ProductsLayout/ProductsLayout"
import Products from "./pages/Products/Products"
import { FiltersProvider } from "./context/FiltersContext"

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />

      <Route element={<ProductsLayout />}>
        <Route path="men" element={<Products parentRouteId="men" />} />

        <Route path="women" element={<Products parentRouteId="women" />} />

        <Route
          path="children"
          element={<Products parentRouteId="children" />}
        />
      </Route>
      <Route path="product" element={<Navigate to={"/"} />} />
      <Route path="product/:id" element={<DetailProduct />} />
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
    </Route>
  )
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuthContextProvider>
          <FiltersProvider>
            <RouterProvider router={router} />
          </FiltersProvider>
        </AuthContextProvider>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
