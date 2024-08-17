import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import styles from "./LoginForm.module.css"

import Input from "../UI/Input/Input"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import GoBackLogin from "../GoBackLogin/GoBackLogin"

interface ActionData {
  errors?: string[]
  message?: string
  user?: {
    email: string
    isAdmin: boolean
  }
}

const LoginForm = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const actionData = useActionData() as ActionData
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (actionData?.user) {
      setIsLoggedIn(true)
      navigate(-1)
    }
  }, [actionData, navigate, setIsLoggedIn])

  const errors = actionData?.errors || []
  return (
    <Form method="post" className={styles.formBox}>
      <GoBackLogin />
      <h2 className={styles.actionTitle}>Вхід</h2>
      <div className={styles.inputsContainer}>
        <Input
          divClassName={`${styles.inputbox} ${styles.fullWith}`}
          placeholder="електронна пошта"
          type="text"
          id="email"
          name="email"
          label=""
          required
          disabled={isSubmitting}
        />
        {errors[0] && <p style={{ color: "red" }}>{errors[0]}</p>}
        <Input
          divClassName={`${styles.inputbox} ${styles.fullWith}`}
          placeholder="пароль"
          type="password"
          id="password"
          name="password"
          required
          label=""
          disabled={isSubmitting}
        />
      </div>
      {errors[1] && <p style={{ color: "red" }}>{errors[1]}</p>}
      <div className={`${styles.buttonCase} ${styles.applyBtn}`}>
        <button
          type="submit"
          id="applyBtn"
          className={styles.subBttn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Вхід..." : "Продовжити"}
        </button>
      </div>
      <div className={styles.detailContainer}>
        <Link to={"/register"}>
          <p>Зареєструватися</p>
        </Link>
        <p>Забули пароль?</p>
      </div>
    </Form>
  )
}

export default LoginForm
