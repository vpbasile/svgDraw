import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { SetStateAction, useState } from 'react';
import SidebarSection from '../../../common/SidebarSection';
import ColorModeButton from './B_ColorMode';

export default function SVGDrawControls() {
    const [fileName, setFileName] = useState<string>('svgdraw');

    const downloadCurrentSvg = () => {
        const svgElement = document.querySelector('#canvas-box svg');

        if (!(svgElement instanceof SVGSVGElement)) {
            return;
        }

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');

        anchor.href = url;
        anchor.download = `${fileName || 'svgdraw'}.svg`;
        anchor.click();

        URL.revokeObjectURL(url);
    };

    return <SidebarSection id="svgdraw-controls" title="SVGDraw Controls">
        <InputGroup>
            <ColorModeButton />
        </InputGroup>
        <InputGroup>
            <FormControl>
                <FormLabel>Filename</FormLabel>
                <Input
                    placeholder={fileName}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFileName(e.target.value)}
                    transition={'width 0.75s'}
                />
                <FormHelperText>Filename will be appended with .svg</FormHelperText>
                <Button mt={2} onClick={downloadCurrentSvg}>
                    Download SVG
                </Button>
            </FormControl>
        </InputGroup>
    </SidebarSection>
}