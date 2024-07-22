import LoginForm from "../../components/LoginForm/LoginForm"
import AuthAPI from "../../api/Auth/AuthAPI"
import { isAxiosError } from "axios"
import { ActionFunctionArgs, json, redirect } from "react-router-dom"

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  }

  if (!userData.email || !userData.password) {
    return json({ message: "Email and password are required" }, { status: 400 })
  }

  try {
    await AuthAPI.loginUser(userData)
    return redirect("/")
  } catch (err) {
    if (isAxiosError(err)) {
      if (err?.response?.status === 422) {
        return err.response
      }
    }
    return json({ message: "Couldn't register" }, { status: 500 })
  }
}

const Login = () => {
  return <LoginForm />
}

export default Login
