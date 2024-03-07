import { Link } from 'react-router-dom'

export const BoardList = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/boards/board-1">Board 1</Link>
        </li>
      </ul>
    </div>
  )
}
