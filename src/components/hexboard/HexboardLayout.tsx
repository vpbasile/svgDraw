import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from '@chakra-ui/react';
export default function HexboardLayout(props: { id: string, displayTitle: string, forms?: JSX.Element[], board: JSX.Element, roster: JSX.Element, children?: JSX.Element }) {

    return (<Box>
        <Box display={{ lg: 'flex' }}>
            <Box id='form' p={3}>
                {props.forms && <Box>
                    {props.forms.map((form, i) => { return <Box key={i}>{form}</Box> })}
                </Box>}
            </Box>
            <Box w={'full'}>
                <Heading>HexBoard: {props.displayTitle}</Heading>
                {/* Display any children that were passed as props */}
                <Box>{props.children}</Box>
                <Box color={'blue.500'} border={'2px'}>{props.board}</Box>
            </Box>
        </Box>
        <Accordion id={props.id} allowMultiple>
            <AccordionItem id='roster'>
                <AccordionButton>Roster<AccordionIcon /></AccordionButton>
                <AccordionPanel>
                    {props.roster}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </Box>)
}