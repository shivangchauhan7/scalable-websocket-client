/**
 * It's a button component. Whoop-di-doo.
 * 
 * You can use your own classes but they're appended to the default list of
 * classes.
 * 
 * The following classes are used by default
 * - py-2
 * - px-4
 * - border-[1px]
 * - disabled:cursor-not-allowed
 */
export default function Button(props) {
  const {className, ...otherProps} = props
  const classes = 'py-2 px-4 border-[1px] disabled:cursor-not-allowed '
                + (className || '')
  
  return (
    <button className={classes} {...otherProps} />
  )
}