import { type ChangeEvent, type ReactNode } from 'react'

export type FormsetChangeHandler = (
  e: ChangeEvent<HTMLInputElement>,
  field: string,
  key?: number | string,
) => void

export const Formset = <
  T extends {
    key: number
    [key: string]: string | number
  },
>(props: {
  template: (item: T, changeHandler: FormsetChangeHandler) => ReactNode
  items: T[]
  onAddItem: () => void
  onRemoveItem: (key: number) => void
  onChangeItem: FormsetChangeHandler
}) => {
  const { template, items, onAddItem, onRemoveItem, onChangeItem } = props

  const handleAdd = () => {
    onAddItem()
  }

  const handleRemove = (key: number) => {
    onRemoveItem(key)
  }

  return (
    <>
      {items.map((item) => (
        <div className="row" key={item.key}>
          {template(item, onChangeItem)}
          <button
            onClick={() => handleRemove(item.key)}
            type="button"
            className="button-text--error"
          >
            &#10005;
          </button>
        </div>
      ))}
      <div className="row">
        <button
          onClick={handleAdd}
          type="button"
          className="button-text--success"
        >
          &#43; Add Item
        </button>
      </div>
    </>
  )
}
