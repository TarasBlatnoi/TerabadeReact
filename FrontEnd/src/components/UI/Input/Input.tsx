interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
  id: string
  name: string
  label: string
  divClassName?: string
}

const Input = ({
  name,
  id,
  type,
  label,
  divClassName = "",
  ...props
}: InputProps) => {
  return (
    <div className={`${divClassName}`}>
      <input type={type} id={id} name={name} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Input
