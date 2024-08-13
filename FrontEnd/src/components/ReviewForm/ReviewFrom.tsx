import { FormEvent, ReactNode } from "react"
interface ReviewFormProps {
  children: ReactNode
  handleSubmit: (reviewInfo: string) => void
}

interface FormDataType {
  text: string
}

const ReviewForm = ({ children, handleSubmit }: ReviewFormProps) => {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData) as unknown as FormDataType
    handleSubmit(data.text)
  }
  return <form onSubmit={onSubmit}>{children}</form>
}

export default ReviewForm
