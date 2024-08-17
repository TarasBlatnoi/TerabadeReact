import { Form, Link } from "react-router-dom"
import Input from "../../components/UI/Input/Input"
import styles from "./Register.module.css"

export async function action({ request }) {}

function Register() {
  return (
    <Form method="POST" action="" className={styles.form}>
      <h2 className={styles.title}>Реєстрація</h2>
      <div className={styles.detailsContainer}>
        <Input
          placeholder="First name"
          type="text"
          id="name"
          name="name"
          label=""
          required
        />
        <Input
          placeholder="Last name"
          type="text"
          name="lastName"
          id="lastName"
          required
          label=""
        />
      </div>

      <div className={styles.inputsContainer}>
        <Input
          placeholder="email"
          type="text"
          id="email"
          name="email"
          label=""
          required
        />
        <Input
          placeholder="password"
          type="password"
          id="password"
          name="password"
          required
          label=""
        />
      </div>
      <div>
        <button type="submit" className={styles.subButtn}>
          Зареєструватись
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
