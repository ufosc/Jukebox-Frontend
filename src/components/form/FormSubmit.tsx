import { FormGroup } from './FormGroup'

export const FormSubmit = (props: { text?: string; disabled?: boolean }) => {
  const { text, disabled } = props
  return (
    <FormGroup id="submit">
      <input
        className="button-solid"
        type="submit"
        role="button"
        value={text || 'Submit'}
        disabled={disabled ?? false}
      />
    </FormGroup>
  )
}
