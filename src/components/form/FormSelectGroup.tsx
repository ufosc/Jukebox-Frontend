import { forwardRef, type ChangeEvent, type Ref } from 'react'
import { mergeClassNames } from 'src/utils'
import { FormGroup, formControlId, type FormGroupProps } from './FormGroup'

const FormSelectGroupComponent = (
  props: FormGroupProps & {
    options?: { label: string; value: string | number }[]
    required?: boolean
    onChange?: (
      e: ChangeEvent<HTMLSelectElement>,
      id: FormGroupProps['id'],
      groupId?: string | number,
    ) => void
  },
  ref: Ref<HTMLSelectElement>,
) => {
  const { id, options, required, defaultValue, groupId, onChange, className } =
    props

  const groupClassNames = mergeClassNames(className)

  return (
    <FormGroup className={groupClassNames} {...props}>
      <div className="form-select-control">
        <select
          name={id}
          id={formControlId(id, groupId)}
          className="form-control"
          ref={ref}
          required={required || false}
          defaultValue={defaultValue}
          onChange={(e) => onChange && onChange(e, id, groupId)}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </FormGroup>
  )
}

export const FormSelectGroup = forwardRef(FormSelectGroupComponent)
