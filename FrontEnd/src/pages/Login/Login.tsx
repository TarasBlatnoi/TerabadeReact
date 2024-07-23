import LoginForm from "../../components/LoginForm/LoginForm"
import AuthAPI from "../../api/Auth/AuthAPI"
import { isAxiosError } from "axios"
import {
  ActionFunctionArgs,
  json,
  redirect,
  useNavigation,
} from "react-router-dom"

interface Error {
  msg: string
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  }

  if (!userData.email || !userData.password) {
    return json(
      { errors: ["Email and password are required"] },
      { status: 422 }
    )
  }

  try {
    await AuthAPI.loginUser(userData)
    return redirect("/")
  } catch (err) {
    if (isAxiosError(err)) {
      if (err?.response?.status === 422) {
        return json({
          errors: err.response.data.errors.map((error: Error) => error.msg),
        })
      }
    }
    throw json({ errors: ["Couldn't register"] }, { status: 500 })
  }
}

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  return <LoginForm isSubmitting={isSubmitting} />
}

export default Login
