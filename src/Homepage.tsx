import { Box, Heading } from "@chakra-ui/react";
import SVGDraw from "./module-svgDraw";

export default function Home() {
    return (<>
        <Heading as={'h1'}>SVGDraw</Heading>
        <Box border={'2px solid wthie'}>
            <SVGDraw />
        </Box>
    </>)
}