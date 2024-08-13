import { FormEvent, ReactNode } from "react"

interface ReviewFormProps {
  children: ReactNode
  onSubmit: (data: object) => object
}

const ReviewForm = ({ children, onSubmit }: ReviewFormProps) => {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    onSubmit(data)
  }
  return <form onSubmit={handleSubmit}>{children}</form>
}

export default ReviewForm
