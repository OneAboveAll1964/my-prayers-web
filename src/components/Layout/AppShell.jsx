import { Outlet, useLocation } from 'react-router-dom'
import { BottomTabBar } from './BottomTabBar'
import { Sidebar } from './Sidebar'
import './AppShell.css'

export function AppShell() {
  const location = useLocation()
  return (
    <div className="app shell" data-route={location.pathname}>
      <Sidebar />
      <main className="shell-main mp-scroll">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <BottomTabBar />
    </div>
  )
}
