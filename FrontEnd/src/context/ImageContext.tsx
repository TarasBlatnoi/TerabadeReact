import { createContext, useContext, useState } from "react"

type ContextValueType = {
  activeImage: string
  setActiveImage: React.Dispatch<React.SetStateAction<string>>
}

const ImageContext = createContext(
  null
) as React.Context<null | ContextValueType>

type ImagesProviderProps = {
  children: React.ReactElement
}

function ImagesProvider({ children }: ImagesProviderProps) {
  const [activeImage, setActiveImage] = useState<string>("")

  return (
    <ImageContext.Provider
      value={{
        activeImage,
        setActiveImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

function useImages() {
  const contextValue = useContext(ImageContext)
  if (!contextValue)
    throw new Error("Images context must be used only withing ImagesProvider")
  return contextValue
}

export { useImages, ImagesProvider }
