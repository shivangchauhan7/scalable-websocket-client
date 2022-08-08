import PropTypes from 'prop-types'

/**
 * Renders a list. Last item in the list is rendered first.
 * 
 * Only two props are required:
 * - `Item`
 * - `items`
 * 
 * `Item` is the component used to render each item in the list.
 * 
 * `items` is the list of items to render in the list. Each item must have an
 * `id` field to use as a key.
 */
export default function List(props) {
  const {Item, items = []} = props

  return (
    <div className="flex flex-col-reverse overflow-auto">
      {
        items.map(item => <Item key={item.id} {...item} />)
      }
    </div>
  )
}

List.propTypes = {
  Item: PropTypes.elementType.isRequired,
  items: PropTypes.array
}