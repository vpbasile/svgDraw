import { Accordion, Box, Center, Flex, Heading } from '@chakra-ui/react';
import { scaleProps } from './types';
export default function ScaleSVGWrapper(props: scaleProps & { displayTitle: string, children?: React.ReactNode }) {

    return <Flex height="100vh">
        {/* SVG Canvas - Dynamic width when panel is open */}
        <Center id="canvas-box" flex={1} >
            {props.children}
        </Center>
        {/* Control Panel */}
        <Box id='control-panel-column'
            boxShadow="sm" border={'2px'}
            width={300}
            height="100vh" // Restricts height to viewport
            overflowY="auto" // Enables vertical scrolling
        >
            <Heading as={'h2'} size="md" color={'gray'}>{props.displayTitle}</Heading>
            <Accordion allowToggle>
                {/* {controlPanelContent.map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItem >
                            <AccordionButton><AccordionIcon />
                                <Heading as={item.level} size="md">{item.value}</Heading>
                            </AccordionButton>
                            <AccordionPanel>
                                {item.content}
                            </AccordionPanel>
                        </AccordionItem>
                    </AccordionItem>
                ))} */}
            </Accordion>
        </Box>
    </Flex>
}