export default function Heading(props) {
  const {className = '', ...otherProps} = props

  return (
    <h2
      className={'uppercase text-sm font-bold pb-5 ' + className}
      {...otherProps} />
  )
}