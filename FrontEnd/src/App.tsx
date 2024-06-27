import "./App.css"
import Layout from "./components/Layout/Layout"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Layout />}></Route>)
)

function App() {
  return <RouterProvider router={router} />
}

export default App
