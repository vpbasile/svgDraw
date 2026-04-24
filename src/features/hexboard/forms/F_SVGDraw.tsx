import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import { ReactNode, SetStateAction, useState } from 'react';
import SidebarSection from '../../../common/SidebarSection';
import ColorModeButton from './B_ColorMode';

type SVGDrawControlsProps = {
    children?: ReactNode;
};

export default function SVGDrawControls({ children }: SVGDrawControlsProps) {
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

    return <>
        <SidebarSection id="svgdraw-appearance" title="Appearance">
            <FormControl>
                <ColorModeButton />
            </FormControl>
            <Text fontSize="sm" color="gray.600">Color Mode only affects the controls inside this app.  They do not impact the exported SVG.</Text>
        </SidebarSection>

        <SidebarSection id="svgdraw-export" title="Export SVG">
            <FormControl>
                <FormLabel>Filename</FormLabel>
                <Input
                    value={fileName}
                    placeholder="svgdraw"
                    size="sm"
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFileName(e.target.value)}
                    transition={'width 0.75s'}
                />
                <FormHelperText mt={1}>Filename will be appended with .svg</FormHelperText>
                <Button mt={3} size="sm" colorScheme="blue" onClick={downloadCurrentSvg}>
                    Download SVG
                </Button>
            </FormControl>
        </SidebarSection>

        {children}
    </>
}