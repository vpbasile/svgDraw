import { Outlet } from 'react-router-dom'

export default function Layout() {

    return (<>
        {/* <SandboxHeader /> */}
        {/* <Box id='mainBody' p={9}> */}
            {/* This is where the children will be rendered */}
            <Outlet />
        {/* </Box> */}
        {/* <SandboxFooter /> */}
    </>)
}