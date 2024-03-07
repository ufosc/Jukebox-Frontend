import { ControlPanel } from '../components/ControlPanel/ControlPanel'

import { NavBar, TaskBar } from '../components'
import './Dashboard.css'

export const Dashboard = () => {
  return (
    <div className=".container">
      <div className="rows">
        <div className=".container">
          <div className="boundary">
            <TaskBar></TaskBar>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className=".navbar">
          <NavBar />
        </div>

        <div>
          <ControlPanel></ControlPanel>
        </div>
      </div>
    </div>
  )
}
