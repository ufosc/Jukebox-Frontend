import { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Clock, TracksPanel } from '../components'
import { DisplayPanel } from '../components/DisplayPanel'
import './Board1.scss'
import { boolean } from 'zod'

const ItemType = 'PANEL'

interface DragItem {
  id: string
  index: number
}

//draggable panel properties, children is set by panel === 'display'/'tracks'
interface DraggablePanelProps {
  id: string
  index: number
  swapPanels: (fromIndex: number, toIndex: number) => void
  children: React.ReactNode
}

//This is a wrapper used to make the DisplayPanel and TracksPanel draggable
const DraggablePanel: React.FC<DraggablePanelProps> = ({
  id,
  index,
  swapPanels,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<DragItem>({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        //call swapPanels if the index of the item being dragged doesn't equal the index of the item hovered over
        swapPanels(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="draggable-panel"
      style={{
        //change opacity to see which board is being dragged
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  )
}

export const Board1: React.FC = () => {
  const [panels, setPanels] = useState<string[]>(['display', 'tracks'])
  const [isDraggable, setIsDraggable] = useState<boolean>(false)

  const swapPanels = (fromIndex: number, toIndex: number) => {
    setPanels((prev) => {
      const updated = [...prev]
      if (isDraggable) {
        //block swap from happening if drag isn't toggled
        ;[updated[fromIndex], updated[toIndex]] = [
          updated[toIndex],
          updated[fromIndex],
        ]
      }
      return updated
    })
  }

  const toggleDrag = (set: boolean) => {
    setIsDraggable(set)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {' '}
      {/* Drag and Drop wrap  required for react-dnd*/}
      <button
        className={`dragToggle ${isDraggable ? 'active' : 'inactive'}`}
        onClick={() => toggleDrag(!isDraggable)}
      >
        <p>
          {/* test code {isDraggable ? "It is!" : "It is not"}*/}
          Customize the Layout!
        </p>
      </button>
      <div className="board board-1">
        {/* panels.map iterates over the two panels stored in useState<string[]>(['display', 'tracks']) and create a DraggablePanel FC using the panel and index properties*/}
        {panels.map((panel, index) => (
          <DraggablePanel
            key={panel}
            id={panel}
            index={index}
            swapPanels={swapPanels}
          >
            {/* if the panels name is "display" we render the <DisplayPanel>; If it's name is "tracks" we render <TracksPanel />*/}
            {panel === 'display' ? (
              <DisplayPanel>
                <Clock />
              </DisplayPanel>
            ) : (
              <TracksPanel />
            )}
          </DraggablePanel>
        ))}
      </div>
    </DndProvider>
  )
}
