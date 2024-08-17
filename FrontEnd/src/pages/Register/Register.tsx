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
import { isAxiosError } from "axios"
import { validatePassword } from "../../utils/passwordValidator"
import GoBackLogin from "../../components/GoBackLogin/GoBackLogin"

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

  if (!EmailValidator.validate(userData.email))
    return { error: "Невірна адреса електронної пошти" }
  if (!validatePassword(userData.password))
    return {
      error: `Пароль повинен бути щонайменше 6 літер *
                      `,
    }
  try {
    await UserAPI.registerUser({
      email: userData.email,
      password: userData.password,
    })
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error?.response?.data.errors?.[0].msg as string
      return { error: errorMessage }
    }

    return error
  }

  return redirect("/")
}

function Register() {
  const { state } = useNavigation()
  const errObj = useActionData() as { error: string } | undefined

  const isSubmitting = state === "submitting"

  console.log(errObj)

  return (
    <Form method="POST" className={styles.form}>
      <GoBackLogin />
      <h2 className={styles.title}>Реєстрація</h2>
      <div className={styles.detailsContainer}>
        <Input
          placeholder="Імʼя"
          type="text"
          id="firstName"
          name="firstName"
          label=""
          required
          disabled={isSubmitting}
        />
        <Input
          placeholder="Прізвище"
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
          placeholder="електронна пошта"
          type="text"
          id="email"
          name="email"
          label=""
          disabled={isSubmitting}
          required
        />

        <Input
          placeholder="пароль"
          type="password"
          id="password"
          name="password"
          required
          disabled={isSubmitting}
          label=""
        />
        {errObj?.error && !isSubmitting ? (
          <p className={styles.errorMessage}>{errObj.error}</p>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          className={styles.subButtn}
          disabled={isSubmitting}
        >
          {!isSubmitting ? "Зареєструватись" : "Створюємо ваш аккаунт..."}
        </button>
      </div>
      <div className={styles.refContainer}>
        <Link to={"/login"}>
          <p>Вже маєте аккаунт?</p>
        </Link>
      </div>
    </Form>
  )
}

export default Register
