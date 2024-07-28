import { json, redirect } from "react-router-dom"
import AuthAPI from "../api/Auth/AuthAPI"

async function loader() {
  try {
    const res = await AuthAPI.checkAuth()
    if (!res.authenticated) {
      return redirect("/login")
    }
    return null
  } catch (err) {
    throw json(
      {
        message: "Something bad happend to the server",
      },
      { status: 500 }
    )
  }
}

export default loader
