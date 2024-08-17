import PasswordValidator from "password-validator"

const validator = new PasswordValidator()

validator
  .is()
  .min(6)
  .is()
  .max(16)
  .is()
  .not()
  .oneOf(["Password123", "Qwerty123", "Qwerty1", "Qwerty2", "Qwerty3"])

export function validatePassword(password: string) {
  return validator.validate(password)
}
