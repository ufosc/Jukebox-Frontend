import React, { useEffect, useRef } from "react"

import "./CardList.scss"
import { useDrag, useDrop } from "react-dnd"

export default interface TempCard {
  id:number,
  name:string,
}

export const CardList = (props: { track: IQueuedTrack, moveListItem:(dragIndex: number, hoverIndex: number) => void , index:number, dropEvent:any } ) => {

  const {track} = props

  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item:any, monitor:any) => {
      const dragIndex = item.index
      const hoverIndex = props.index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      if(hoverBoundingRect === undefined)
      {
        console.log("Error!")
        return
      }
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      //Fix this to use the actual box y instead of the actual cursor y
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

      props.moveListItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  dragRef(dropRef(ref))

  useEffect(()=>{
    if(isDragging)
    {
      console.log(`Element ${track.track.name} is being dragged`)
    }else{
      console.log(`Element ${track.track.name} is no longer being dragged`)
    }
  }, [isDragging])

  useEffect(()=>{
    console.log("Page Refreshed")
  },[])

  return(
    <>
    <div className="cards" ref={ref} onDrop={props.dropEvent}>
      {track.track.name}
    </div>
    </>
  )
}