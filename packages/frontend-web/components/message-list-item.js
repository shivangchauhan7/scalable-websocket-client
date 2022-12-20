import PropTypes from 'prop-types'

export default function MessageListItem(props) {
  const {sentBy, content, sentAt, onSelect, isSelected} = props
  const sentByColor = sentBy === 'me' ? 'text-black' : 'text-blue-500'

  const onClick = (e) => {
    e.preventDefault()

    const selected = {...props}
    delete selected.onSelect
    delete selected.isSelected

    onSelect(selected)
  }

  return (
    <div
      onClick={onClick}
      className={'flex py-1 px-2 hover:bg-slate-200 text-xs hover:cursor-pointer ' + (isSelected ? 'bg-slate-200' : '')}>

      <span className={'w-12 inline-block uppercase font-bold ' + sentByColor}>
        {sentBy}
      </span>
      
      <span className="grow px-2 inline-block max-w-md truncate">
        {content}
      </span>

      <span className="inline-block text-slate-400 text-right grow">
        {sentAt.toLocaleString()}
      </span>
    </div>
  )
}

MessageListItem.propTypes = {
  sentBy: PropTypes.string.isRequired,
  content: PropTypes.string,
  sentAt: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
}