import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import styles from "./LoginForm.module.css"

import Input from "../UI/Input/Input"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"

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
      navigate("/")
    }
  }, [actionData, navigate, setIsLoggedIn])

  const errors = actionData?.errors || []
  return (
    <Form method="post" className={styles.formBox}>
      <h2 className={styles.actionTitle}>Sign up</h2>
      <div className={styles.inputsContainer}>
        <Input
          divClassName={`${styles.inputbox} ${styles.fullWith}`}
          placeholder="email"
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
          placeholder="password"
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
          className={styles.narrowBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </div>
      <div>
        <p>r</p>
      </div>
    </Form>
  )
}

export default LoginForm
