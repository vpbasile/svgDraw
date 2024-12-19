// Header

import { Flex, Heading, Link } from "@chakra-ui/react";

export default function Header() {

    return (<Flex id="header" borderBottom={`2px`} marginBottom={'xl'}>
        <Heading flex={3} as={'h1'}><Link href="/">SVGDraw</Link></Heading>
    </Flex >)
}