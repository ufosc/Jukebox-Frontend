import { createContext, ReactNode } from 'react'

export const ClubContext = createContext({
  currentClub: {} as IClub,
  setCurrentClub: (id: number) => {},
})

export const ClubProvider = (props: { children: ReactNode; club: IClub }) => {
  const { children } = props

  const setCurrentClub = (id: number) => {}

  return (
    <ClubContext.Provider value={{ currentClub: {} as IClub, setCurrentClub }}>
      {children}
    </ClubContext.Provider>
  )
}
