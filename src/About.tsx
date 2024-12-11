import { Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function About() {
    return (<>
        <Heading as={'h1'}>About Page</Heading>
        <Link to={"/"} ><Text size={'3xl'}>HomePage</Text></Link>
    </>)
}