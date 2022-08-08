import PropTypes from 'prop-types'

export default function LogListItem(props) {
  const {content, level, createdAt} = props
  let levelColor = 'text-black'

  if (level === 'warn') {
    levelColor = 'text-orange-600'
  }

  if (level === 'error') {
    levelColor = 'text-red-600'
  }
  
  return (
    <div className="flex group py-1 px-2 hover:bg-slate-200 text-xs">
      <span className={'w-12 inline-block uppercase font-bold ' + levelColor}>
        {level}
      </span>
      
      <span className="grow px-2 inline-block">
        {content}
      </span>

      <span className="inline-block text-transparent group-hover:text-black">
        {createdAt.toLocaleString()}
      </span>
    </div>
  )
}

LogListItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  level: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date)
}