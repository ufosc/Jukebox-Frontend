import { useParams } from 'react-router-dom'
import { Board1 } from './Board1'
import { Board2 } from './Board2'
import { Board3 } from './Board3'

export const BoardOutlet = () => {
  const { id } = useParams()

  switch (id) {
    case '1':
      return <Board1 />
    case '2':
      return <Board2 />
    case '3':
      return <Board3 />
  }

  return <div>Invalid board: {id}</div>
}
