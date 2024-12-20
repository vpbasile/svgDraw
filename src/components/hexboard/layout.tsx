import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
export default function HexNest() {
    return (<Box id='hex-nest'>
        <Outlet />
    </Box>)
}