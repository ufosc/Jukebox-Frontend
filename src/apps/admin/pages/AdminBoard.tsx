import './AdminBoard.scss'
import boardImage from 'src/assets/img/boardImage.png'

export const AdminBoard = () => {
  return (
    <>
      <div>
        <div className="header">Boards</div>
        <div className="grid">
          <div className="board-row col-12 grid">
            <div className="Board col-4">
              <img
                src={boardImage}
                className="boardImage"
                alt="Board Image"
              ></img>
            </div>
            <div className="Board col-4">
              <img
                src={boardImage}
                className="boardImage"
                alt="Board Image"
              ></img>
            </div>
            <div className="Board col-4">
              <img
                src={boardImage}
                className="boardImage"
                alt="Board Image"
              ></img>
            </div>
          </div>
          <div className="board-row col-12 grid">
            <div className="Board col-4">
              <img
                src={boardImage}
                className="boardImage"
                alt="Board Image"
              ></img>
            </div>
            <div className="Board col-4">
              <img
                src={boardImage}
                className="boardImage"
                alt="Board Image"
              ></img>
            </div>
            <div className="Board col-4">
              <img
                src={boardImage}
                className="boardImage"
                alt="Board Image"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
