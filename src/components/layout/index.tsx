// Index
import { Outlet } from 'react-router-dom'
import Header from './header'

export default function Layout() {

    return (<>
        <Header />
        {/* This is where the children will be rendered */}
        <Outlet />
        <MainFooter />
    </>)
}