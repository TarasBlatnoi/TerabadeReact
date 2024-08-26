import { useRouteError, isRouteErrorResponse } from "react-router-dom"

function Error() {
  const error = useRouteError()

  let message = "We can't find the page you are looking for"

  if (isRouteErrorResponse(error)) {
    if (error.data.message) message = error.data.message
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default Error
