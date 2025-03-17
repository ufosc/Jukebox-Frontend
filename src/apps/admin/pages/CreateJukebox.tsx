import { Form, FormInputGroup, FormSection } from 'src/components'

import { useRef } from 'react'

import './CreateJukebox.scss'

export const CreateJukebox = () => {
  const jukeboxRef = useRef<HTMLInputElement>(null)
  const clubRef = useRef<HTMLInputElement>(null)

  const handleLoginSubmit = () => {
    const jukebox = jukeboxRef.current?.value || ''
    const club = clubRef.current?.value || ''
  }

  return (
    <>
      <div className="jukebox-form">
        <h1 className="title">Create Jukebox</h1>

        <Form onSubmit={handleLoginSubmit} className="form">
          <FormSection>
            <FormInputGroup
              label="Jukebox"
              id="jukebox"
              type="text"
              ref={jukeboxRef}
              required
              className="auth-form__group"
            ></FormInputGroup>
          </FormSection>
          
          <FormSection>
          <div>Select Club</div>
            <FormInputGroup label="Club" id="club">


            </FormInputGroup>
          </FormSection>

          <FormSection>
            <div>Select Accounts</div>
          </FormSection>

        </Form>
      </div>
    </>
  )
}
