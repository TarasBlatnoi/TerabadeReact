import { Form, useActionData } from "react-router-dom"
import styles from "./LoginForm.module.css"

import Input from "../UI/Input/Input"

interface LoginFormProps {
  isSubmitting: boolean
}

interface ActionData {
  errors?: string[]
}

const LoginForm = ({ isSubmitting }: LoginFormProps) => {
  const actionData = useActionData() as ActionData
  const errors = actionData?.errors || []
  return (
    <Form method="post" className={styles.formBox}>
      <h2>Sign up</h2>
      <Input
        divClassName={`${styles.inputbox} ${styles.fullWith}`}
        type="text"
        id="email"
        name="email"
        label=""
        required
      />
      {errors[0] && <p style={{ color: "red" }}>{errors[0]}</p>}
      <Input
        divClassName={`${styles.inputbox} ${styles.fullWith}`}
        type="password"
        id="password"
        name="password"
        required
        label=""
      />
      {errors[1] && <p style={{ color: "red" }}>{errors[1]}</p>}
      <div className={`${styles.buttonCase} ${styles.applyBtn}`}>
        <button
          type="submit"
          id="applyBtn"
          className={styles.narrowBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </Form>
  )
}

export default LoginForm
