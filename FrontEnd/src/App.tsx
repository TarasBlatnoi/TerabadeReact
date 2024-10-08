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
import NotFound from "./pages/NotFound/NotFound"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./components/ErrorFallback/ErrorFallback"
import { ProductsProvider } from "./context/ProductsContext"
import Spinner from "./components/LoadingSpinner/Spinner"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ProductsLayout />
            </ErrorBoundary>
          }
        >
          <Route path="products" element={<Products />} />
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
            <Suspense fallback={<Spinner />} key={"login"}>
              <Login />
            </Suspense>
          }
          action={(meta) =>
            import("./pages/Login/Login").then((module) => module.action(meta))
          }
        />
        <Route path="register" element={<Register />} action={RegisterAction} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

function App() {
  return (
    <ImagesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CartProvider>
            <ProductsProvider>
              <AuthContextProvider>
                <RouterProvider router={router} />
              </AuthContextProvider>
            </ProductsProvider>
          </CartProvider>
        </Provider>
      </QueryClientProvider>
    </ImagesProvider>
  )
}

export default App
