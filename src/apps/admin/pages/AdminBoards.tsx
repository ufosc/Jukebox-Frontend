import { Link } from 'react-router-dom'
import boardImage from 'src/assets/img/boardImage.png'
import './AdminBoards.scss'

export const AdminBoards = () => {
  const boards: { image: string; link: string }[] = [
    { image: boardImage, link: '/boards/1' },
    { image: boardImage, link: '/boards/2' },
    { image: boardImage, link: '/boards/3' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
    { image: boardImage, link: '#' },
  ]

  return (
    <>
      <div>
        <div className="header">Boards</div>
        <div className="grid">
          {boards.map((board) => (
            <Link to={board.link} target="_blank" className="col-4">
              <img
                src={board.image}
                className="boardImage"
                alt="Board Image"
              ></img>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
