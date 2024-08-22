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
import Register, { action as RegisterAction } from "./pages/Register/Register"
import Checkout from "./pages/Checkout/Checkout"
import Cart from "./pages/Cart/Cart"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route element={<ProductsLayout />}>
          <Route path="/products" element={<Products />} />

          <Route path="men" element={<Products />} />

          <Route path="women" element={<Products />} />

          <Route path="children" element={<Products />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />}></Route>
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
        <Route path="register" element={<Register />} action={RegisterAction} />
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
