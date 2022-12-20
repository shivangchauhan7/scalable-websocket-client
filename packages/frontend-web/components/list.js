import {useState} from 'react'
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
  const [selectedItem, setSelectedItem] = useState(null)
  const {Item, items = [], onSelect = () => {}} = props

  const _onSelect = (item) => {
    if (!!selectedItem && item.id == selectedItem.id) {
      // already selected. deselect it.
      onSelect(null)
      setSelectedItem(null)
    }
    else {
      onSelect(item)
      setSelectedItem(item)
    }
  }

  return (
    <div className="flex flex-col-reverse overflow-auto">
      {
        items.map(item => (
          <Item
            key={item.id}
            onSelect={_onSelect}
            isSelected={!!selectedItem && selectedItem.id === item.id}
            {...item} />
        ))
      }
    </div>
  )
}

List.propTypes = {
  Item: PropTypes.elementType.isRequired,
  items: PropTypes.array,
  onSelect: PropTypes.func
}