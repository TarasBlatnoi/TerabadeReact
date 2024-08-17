import { useMutation } from "react-query"
import Button from "../../../components/UI/Button/Button"
import styles from "./FavoriteButtons.module.css"
import ProductAPI from "../../../api/Product/ProductAPI"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { queryClient } from "../../../api/queryClient"

interface FavoriteButtonsPropsType {
  ProductID: number
}

const FavoriteButtons = ({ ProductID }: FavoriteButtonsPropsType) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false)
  console.log({ ProductID })
  const navigate = useNavigate()
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: ProductAPI.addProductToFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["favorites"])
      if (data.status === 300) {
        return navigate("/login")
      }
      setIsAddedToFavorite(true)
    },
  })

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
  } = useMutation({
    mutationFn: ProductAPI.deleteFavoriteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["favorites"])
      if (data.status === 300) {
        return navigate("/login")
      }
      setIsAddedToFavorite(false)
    },
  })

  function handleAddClick() {
    mutate({ ProductID })
  }

  function handleDeleteClick() {
    deleteMutate(ProductID)
  }
  return (
    <>
      {!isAddedToFavorite && (
        <Button
          className={styles.addToFavButton}
          variant="secondaryDark"
          onClick={handleAddClick}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#F9C31F"
          >
            <path d="m480-120.67-46.67-42q-104.18-95.08-172.25-164.04Q193-395.67 152.67-450.17q-40.34-54.5-56.5-99.16Q80-594 80-640q0-91.44 61.33-152.72 61.34-61.28 152-61.28 55.34 0 103.34 25.33 48 25.34 83.33 72.67 39.33-49.33 86.33-73.67 47-24.33 100.34-24.33 90.66 0 152 61.28Q880-731.44 880-640q0 46-16.17 90.67-16.16 44.66-56.5 99.16-40.33 54.5-108.41 123.46-68.07 68.96-172.25 164.04l-46.67 42Zm0-88.66q99.49-90.67 163.75-155.5Q708-429.67 745.67-478.17q37.66-48.5 52.66-86.42t15-75.31q0-64.1-41.33-105.77-41.33-41.66-105.18-41.66-50.02 0-92.59 29.83-42.56 29.83-65.56 81.5h-58q-22.34-51-64.9-81.17-42.57-30.16-92.59-30.16-63.85 0-105.18 41.66-41.33 41.67-41.33 105.88 0 37.46 15 75.62 15 38.17 52.66 87Q252-428.33 316.67-363.83q64.66 64.5 163.33 154.5Zm0-289Z" />
          </svg>
        </Button>
      )}
      {isLoading && <p>adding...</p>}
      {isError && <p>error occured</p>}
      {isAddedToFavorite && (
        <Button
          className={styles.addToFavButton}
          variant="secondary"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#1C1C1C"
          >
            <path d="m480-120.67-46.67-42q-104.18-95.08-172.25-164.04Q193-395.67 152.67-450.17q-40.34-54.5-56.5-99.16Q80-594 80-640q0-91.44 61.33-152.72 61.34-61.28 152-61.28 55.34 0 103.34 25.33 48 25.34 83.33 72.67 39.33-49.33 86.33-73.67 47-24.33 100.34-24.33 90.66 0 152 61.28Q880-731.44 880-640q0 46-16.17 90.67-16.16 44.66-56.5 99.16-40.33 54.5-108.41 123.46-68.07 68.96-172.25 164.04l-46.67 42Zm0-88.66q99.49-90.67 163.75-155.5Q708-429.67 745.67-478.17q37.66-48.5 52.66-86.42t15-75.31q0-64.1-41.33-105.77-41.33-41.66-105.18-41.66-50.02 0-92.59 29.83-42.56 29.83-65.56 81.5h-58q-22.34-51-64.9-81.17-42.57-30.16-92.59-30.16-63.85 0-105.18 41.66-41.33 41.67-41.33 105.88 0 37.46 15 75.62 15 38.17 52.66 87Q252-428.33 316.67-363.83q64.66 64.5 163.33 154.5Zm0-289Z" />
          </svg>
        </Button>
      )}
      {deleteIsLoading && <p>deleting...</p>}
      {deleteIsError && <p>couldn't delete</p>}
    </>
  )
}

export default FavoriteButtons
