
import { Form, FormInputGroup, FormSection, FormSubmit } from 'src/components'

import { useRef } from 'react'



export const CreateJukebox = () =>{

  

  const jukeboxRef = useRef<HTMLInputElement>(null);
  const clubRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = () => {
    const jukebox = jukeboxRef.current?.value || '';
    const club = clubRef.current?.value || ''
  }

  return(
    <>
    <div>
      Create Jukebox
    </div>

    <Form onSubmit={handleLoginSubmit} className=''>
      <div>
        Jukebox Name
      </div>
      <FormSection>
        <FormInputGroup
        label="Jukebox"
        id="jukebox"
        type="text"
        ref={jukeboxRef}
        required
        
        className="auth-form__group"
        >

        </FormInputGroup>
      </FormSection>
      
      <div>
        Select Club
      </div>
      <FormSection>
        <FormInputGroup
        label="Club"
        id="club"

        >
      </FormInputGroup>
      <div>
        Select Accounts
      </div>
      <FormSection>

      </FormSection>
      </FormSection>


    </Form>
    


    
    </>
  )
}