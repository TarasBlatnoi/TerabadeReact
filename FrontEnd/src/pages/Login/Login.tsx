import LoginForm from "../../components/LoginForm/LoginForm"
import AuthAPI from "../../api/Auth/AuthAPI"
import { isAxiosError } from "axios"
import { ActionFunctionArgs, json, useSearchParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"

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
      { status: 422 },
    )
  }

  try {
    const res = await AuthAPI.loginUser(userData)
    return res
  } catch (err) {
    if (isAxiosError(err)) {
      if (err?.response?.status === 422) {
        return json({
          errors: err.response.data.errors.map((error: Error) => error.msg),
        })
      }
      if (err?.response?.status === 401) {
        return json({
          errors: err.response.data.errors.map((error: Error) => error.msg),
        })
      }
    }
    throw json({ errors: ["Couldn't register"] }, { status: 500 })
  }
}

const Login = () => {
  const [searchParams] = useSearchParams()
  const { setIsLoggedIn } = useContext(AuthContext)
  const queryParam = searchParams.get("loggedIn")
  useEffect(() => {
    if (queryParam) {
      setIsLoggedIn(false)
    }
  }, [setIsLoggedIn, queryParam])

  return <LoginForm />
}

export default Login
