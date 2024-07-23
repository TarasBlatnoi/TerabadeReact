import { Form } from "react-router-dom"
import styles from "./LoginForm.module.css"

import Input from "../UI/Input/Input"

interface LoginFormProps {
  isSubmitting: boolean
}

const LoginForm = ({ isSubmitting }: LoginFormProps) => {
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
      <Input
        divClassName={`${styles.inputbox} ${styles.fullWith}`}
        type="password"
        id="password"
        name="password"
        required
        label=""
      />
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
