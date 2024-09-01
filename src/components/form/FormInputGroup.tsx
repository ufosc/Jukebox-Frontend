import { forwardRef, type ChangeEvent, type Ref } from 'react'
import { FormGroup, formControlId, type FormGroupProps } from './FormGroup'

const FormInputGroupComponent = (
  props: FormGroupProps & {
    type?: string
    required?: boolean
    value?: string | number
    disabled?: boolean
    onChange?: (
      e: ChangeEvent<HTMLInputElement>,
      id: FormGroupProps['id'],
      groupId?: string | number,
    ) => void
  },
  ref: Ref<HTMLInputElement>,
) => {
  const {
    id,
    type,
    required,
    value,
    onChange,
    groupId,
    defaultValue,
    disabled,
  } = props
  return (
    <FormGroup {...props}>
      <input
        type={type || 'text'}
        id={formControlId(id, groupId)}
        name={id}
        className="form-control"
        autoComplete={id}
        ref={ref}
        required={required || false}
        value={value}
        onChange={(e) => onChange && onChange(e, id, groupId)}
        defaultValue={defaultValue}
        disabled={disabled ?? false}
        aria-disabled={disabled ?? false}
      />
    </FormGroup>
  )
}

export const FormInputGroup = forwardRef(FormInputGroupComponent)
