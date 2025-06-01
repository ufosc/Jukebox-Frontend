import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./TempList.scss"
import { CardList } from './CardList'

export const TempList = (props: {
  tracks: IQueuedTrack[]
}) => {

  const tracks = [...props.tracks]

  const [list, setList] = useState([
    {
      id: 1,
      name: "Apple",
    },
    {
      id: 2,
      name: "Banana",
    },
    {
      id: 3,
      name: "Cabbage",
    },
    {
      id: 4,
      name: "Dino",
    },
    {
      id: 5,
      name: "Eggplant",
    },
  ])

  const testDrop = (e:Event) => {
    e.preventDefault();
    console.log("Dropped")
    console.log(tracks)
  }

  const moveListItem = useCallback(
    (dragIndex:number, hoverIndex:number) => {
      const dragItem = list[dragIndex]
      const hoverItem = list[hoverIndex]

      console.log("hello")

      //Swap places of Items

      setList((list) => {
        const updatedList = [...list]
        updatedList[dragIndex] = hoverItem
        updatedList[hoverIndex] = dragItem
        return updatedList
      })
    },
    [tracks],
  )

  return (
    <>
        <div className='dropZone'>
          {tracks.map((item, index) => 
            <CardList
              track={item}
              index={index}
              moveListItem={moveListItem}
              dropEvent={testDrop}
            />
          )}
        </div>
    </>
  )
}
