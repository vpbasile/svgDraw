import { Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
    return (<>
        <Heading as={'h1'}>ZZZ Blank Project</Heading>
        <Text>To find everything that needs to be renamed, search for 'zzz'</Text>
        <Link to={"/about"} ><Text size={'3xl'}>About Page</Text></Link>
        <UnorderedList>
            <Heading as={'h2'}>Using</Heading>
            <ListItem>Typescript</ListItem>
            <ListItem>React</ListItem>
            <ListItem>Vite</ListItem>
            <ListItem>ChakraUI</ListItem>
            <ListItem>Redux-Toolkit</ListItem>
            <ListItem>react-router-dom</ListItem>
        </UnorderedList>
    </>)
}