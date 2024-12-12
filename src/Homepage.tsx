import { Box, Heading, Link } from "@chakra-ui/react";

export default function Home() {
    return <Box border={'2px solid black'} height={'100%'}>
        <Heading as={'h1'}>Home</Heading>
        <Link href={'/tree'}>Tree</Link>
    </Box>
}