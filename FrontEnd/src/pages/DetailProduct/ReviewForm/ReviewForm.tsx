import { useMutation } from "react-query"
import SubmitForm from "../../../components/UI/SubmitForm/SumbitFrom"
import ReviewAPI from "../../../api/Review/ReviewAPI"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { isAxiosError } from "axios"
import Button from "../../../components/UI/Button/Button"
import styles from "./ReviewForm.module.css"

interface ReviewFormProps {
  ProductID: number
}

const ReviewForm = ({ ProductID }: ReviewFormProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [reviewSent, setReviewSent] = useState(false)
  const navigate = useNavigate()
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: ReviewAPI.addReview,
    onSuccess: () => {
      if (textAreaRef.current) {
        textAreaRef.current.value = ""
      }
      setReviewSent(true)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 300) {
          navigate("/login")
        }
      }
    },
  })

  function handleSubmit(formData: FormData) {
    const text = formData.get("text") as string
    mutate({ text: text, ProductID })
  }

  return (
    <SubmitForm handleSubmit={handleSubmit}>
      <div className={styles.reviewContainer}>
        <textarea
          name="text"
          ref={textAreaRef}
          id="responseTextArea"
          placeholder="Напишіть відгук..."
        ></textarea>
        {isLoading && <p>Відгук надсилається</p>}
        {!isLoading && (
          <Button
            variant="secondaryDark"
            type="submit"
            className={styles.buttonSubmitReview}
          >
            Надіслати
          </Button>
        )}
        {isError && <p>Щось пішло не так</p>}
        {reviewSent && <p>Ваш відгук надіслано</p>}
      </div>
    </SubmitForm>
  )
}

export default ReviewForm
