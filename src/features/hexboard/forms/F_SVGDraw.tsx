import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, InputGroup } from '@chakra-ui/react';
import ColorModeButton from './B_ColorMode';
export default function SVGDrawControls() {
    return <Accordion id={'svgdraw-controls'} allowMultiple>
        <AccordionItem id='roster'>
            <AccordionButton>SVGDraw Controls<AccordionIcon /></AccordionButton>
            <AccordionPanel>
                <InputGroup>
                    <ColorModeButton />
                </InputGroup>
                <InputGroup>
                    
                </InputGroup>

            </AccordionPanel>
        </AccordionItem>
    </Accordion>
}