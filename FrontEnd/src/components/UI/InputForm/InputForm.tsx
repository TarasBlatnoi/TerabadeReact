import { Form } from "react-router-dom"
import styles from "./InputForm.module.css"

const InputForm = () => {
  return (
    <Form className={styles.formBox}>
      <h2>Sign up</h2>
      <div className={`${styles.inputbox} ${styles.fullWith}`}>
        <input type="text" id="email" required name="email" />
        <label htmlFor="email">Email</label>
      </div>
      <div className={`${styles.inputbox} ${styles.fullWith}`}>
        <input type="password" id="password" required name="password" />
        <label htmlFor="password">Password</label>
      </div>
      <div className={styles.forget}>
        <label htmlFor="checkbox">
          <input type="checkbox" id="checkbox" />
          Remember Me
          <a href="#">Forget Password</a>
        </label>
      </div>
      <div className={`${styles.buttonCase} ${styles.applyBtn}`}>
        <button type="submit" id="applyBtn" className={styles.narrowBtn}>
          Apply
        </button>
      </div>
    </Form>
  )
}

export default InputForm
