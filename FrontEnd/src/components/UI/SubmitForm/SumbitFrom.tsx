import { FormEvent, ReactNode } from "react"
interface SubmitFormProps {
  children: ReactNode
  handleSubmit: (reviewInfo: FormData) => void
}

const SubmitForm = ({ children, handleSubmit }: SubmitFormProps) => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    handleSubmit(formData)
  }
  return <form onSubmit={onSubmit}>{children}</form>
}

export default SubmitForm
