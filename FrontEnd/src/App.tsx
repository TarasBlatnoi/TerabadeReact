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
import CartProvider from "./context/CartContext"
import Error from "./pages/Error/Error"
import AuthContextProvider from "./context/AuthContext"
import checkAuthLoader from "./utils/checkAuthLoader"
import { QueryClientProvider } from "react-query"
import { queryClient } from "./api/queryClient"
import ProductsLayout from "./pages/ProductsLayout/ProductsLayout"
import Products from "./pages/Products/Products"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { ImagesProvider } from "./context/ImageContext"
import MainLayout from "./pages/MainLayout/MainLayout"
import LoginLayout from "./pages/LoginLayout/LoginLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route element={<ProductsLayout />}>
          <Route path="men" element={<Products parentRouteId="men" />} />

          <Route path="women" element={<Products parentRouteId="women" />} />

          <Route
            path="children"
            element={<Products parentRouteId="children" />}
          />
        </Route>
        <Route path="cart" element={<h1>Cart motherfucka</h1>} />
        <Route path="payment" element={<h1>Payment motherfucka</h1>} />
        <Route path="product" element={<Navigate to={"/"} />} />
        <Route
          path="favorites"
          element={<Favorites />}
          loader={checkAuthLoader}
        />
        <Route path="product/:id" element={<DetailProduct />} />
      </Route>

      <Route element={<LoginLayout />}>
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
        <Route path="register" element={<h1>Register page</h1>} />
      </Route>
    </Route>,
  ),
)

function App() {
  return (
    <ImagesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CartProvider>
            <AuthContextProvider>
              <RouterProvider router={router} />
            </AuthContextProvider>
          </CartProvider>
        </Provider>
      </QueryClientProvider>
    </ImagesProvider>
  )
}

export default App
