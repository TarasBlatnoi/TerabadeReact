import {
  Form,
  Link,
  Params,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom"
import Input from "../../components/UI/Input/Input"
import styles from "./Register.module.css"
import * as EmailValidator from "email-validator"
import UserAPI from "../../api/User/UserAPI"

interface registerAction {
  request: Request
  params: Params
}

export async function action({ request }: registerAction) {
  const data = await request.formData()
  const userData = {
    firstName: data.get("firstName") as string,
    lastName: data.get("lastName") as string,
    email: data.get("email") as string,
    password: data.get("password") as string,
  }

  console.log(userData)

  if (!EmailValidator.validate(userData.email))
    return { error: "Невірна адреса електронної пошти" }

  try {
    const res = await UserAPI.registerUser({
      email: userData.email,
      password: userData.password,
    })
    console.log(res)
  } catch (error) {
    return { error }
  }

  return redirect("/")
}

function Register() {
  const { state } = useNavigation()
  const errObj = useActionData() as { error: string } | undefined

  const isSubmitting = state === "submitting"

  return (
    <Form method="POST" className={styles.form}>
      <h2 className={styles.title}>Реєстрація</h2>
      <div className={styles.detailsContainer}>
        <Input
          placeholder="First name"
          type="text"
          id="firstName"
          name="firstName"
          label=""
          required
          disabled={isSubmitting}
        />
        <Input
          placeholder="Last name"
          type="text"
          name="lastName"
          id="lastName"
          required
          label=""
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputsContainer}>
        <Input
          placeholder="email"
          type="text"
          id="email"
          name="email"
          label=""
          disabled={isSubmitting}
          required
        />
        <p style={{ textAlign: "center" }}>{errObj?.error || null}</p>
        <Input
          placeholder="password"
          type="password"
          id="password"
          name="password"
          required
          disabled={isSubmitting}
          label=""
        />
      </div>
      <div>
        <button type="submit" className={styles.subButtn}>
          {!isSubmitting ? "Зареєструватись" : "Створюємо ваш акаунт..."}
        </button>
      </div>
      <div>
        <Link to={"/login"}>
          <p>Вже маєте аккаунт?</p>
        </Link>
      </div>
    </Form>
  )
}

export default Register
