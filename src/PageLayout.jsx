
import Header from './Header'
import { Outlet } from 'react-router-dom'

function PageLayout() {
  return (
    <>
    <Header/>
    <div>
    <Outlet/>
    </div>
    </>
  )
}

export default PageLayout