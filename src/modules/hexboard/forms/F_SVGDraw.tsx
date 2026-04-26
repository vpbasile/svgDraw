import { Button, ButtonGroup, FormControl, FormHelperText, FormLabel, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { ReactNode, SetStateAction, useEffect, useState } from 'react';
import SidebarSection from '../../../components/SidebarSection';
import { DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSizeKey } from '../../../config/pageSizeSettings';
import { useCanvasZoom } from '../../../hooks/useCanvasZoom';
import ColorModeButton from './B_ColorMode';

type SVGDrawControlsProps = {
    children?: ReactNode;
    defaultPageSize?: PageSizeKey;
};

const PAGE_RECT_ID = 'svgdraw-page-outline';

type ZoomControlsProps = {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    zoomToPage: () => void;
    canZoomToPage: boolean;
};

function ZoomControls({ zoomIn, zoomOut, resetZoom, zoomToPage, canZoomToPage }: ZoomControlsProps) {
    return (
        <FormControl>
            <FormLabel mb={1}>Zoom</FormLabel>
            <ButtonGroup size="sm" isAttached variant="outline" width="100%">
                <Button onClick={zoomOut} flex={1} aria-label="Zoom out">−</Button>
                <Button onClick={resetZoom} flex={2}>Reset</Button>
                <Button onClick={zoomIn} flex={1} aria-label="Zoom in">+</Button>
            </ButtonGroup>
            <Button mt={2} size="sm" variant="outline" width="100%" onClick={zoomToPage} isDisabled={!canZoomToPage}>
                Zoom to Page
            </Button>
            <Text fontSize="xs" color="gray.500" mt={1}>Drag or scroll to pan · Ctrl+scroll or pinch to zoom</Text>
        </FormControl>
    );
}

type PageSizeControlsProps = {
    pageSize: PageSizeKey;
    setPageSize: (value: PageSizeKey) => void;
};

function PageSizeControls({ pageSize, setPageSize }: PageSizeControlsProps) {
    return (
        <FormControl>
            <FormLabel mb={1}>Page Size</FormLabel>
            <Stack spacing={1}>
                {(Object.keys(PAGE_SIZES) as PageSizeKey[]).map((key) => {
                    const optionLabel = key === 'none' ? 'None' : PAGE_SIZES[key]!.label;
                    return (
                        <HStack key={key} spacing={2} fontSize="sm">
                            <input
                                type="radio"
                                name="page-size"
                                value={key}
                                id={`page-size-${key}`}
                                aria-label={`Page size: ${optionLabel}`}
                                title={`Page size: ${optionLabel}`}
                                checked={pageSize === key}
                                onChange={() => setPageSize(key)}
                            />
                            <Text as="label" htmlFor={`page-size-${key}`}>{optionLabel}</Text>
                        </HStack>
                    );
                })}
            </Stack>
        </FormControl>
    );
}

type FileExportControlsProps = {
    fileName: string;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
    downloadCurrentSvg: () => void;
};

function FileExportControls({ fileName, setFileName, downloadCurrentSvg }: FileExportControlsProps) {
    return (
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
    );
}

export default function SVGDrawControls({ children, defaultPageSize }: SVGDrawControlsProps) {
    const [fileName, setFileName] = useState<string>('svgdraw');
    const [pageSize, setPageSize] = useState<PageSizeKey>(defaultPageSize ?? DEFAULT_PAGE_SIZE);
    const { zoomIn, zoomOut, resetZoom, zoomToArea } = useCanvasZoom();

    useEffect(() => {
        setPageSize(defaultPageSize ?? DEFAULT_PAGE_SIZE);
    }, [defaultPageSize]);

    useEffect(() => {
        const svgElement = document.querySelector('#canvas-box svg');
        if (!(svgElement instanceof SVGSVGElement)) return;

        // Remove existing page rect
        svgElement.querySelector(`#${PAGE_RECT_ID}`)?.remove();

        const size = PAGE_SIZES[pageSize];
        if (!size) return;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('id', PAGE_RECT_ID);
        rect.setAttribute('x', String(-size.width / 2));
        rect.setAttribute('y', String(-size.height / 2));
        rect.setAttribute('width', String(size.width));
        rect.setAttribute('height', String(size.height));
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', '#808080');
        rect.setAttribute('stroke-width', '8');
        svgElement.insertBefore(rect, svgElement.firstChild);
    }, [pageSize]);

    const downloadCurrentSvg = () => {
        const svgElement = document.querySelector('#canvas-box svg');
        if (!(svgElement instanceof SVGSVGElement)) return;

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

    const zoomToPage = () => {
        const size = PAGE_SIZES[pageSize];
        if (!size) return;
        zoomToArea(-size.width / 2, -size.height / 2, size.width, size.height);
    };

    return <>
        <SidebarSection id="svgdraw-appearance" title="Appearance">
            <ZoomControls
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetZoom={resetZoom}
                zoomToPage={zoomToPage}
                canZoomToPage={pageSize !== 'none'}
            />
            <FormControl>
                <ColorModeButton />
            <Text fontSize="sm" color="gray.600">Color Mode only affects the controls inside this app.  They do not impact the exported SVG.</Text>
            </FormControl>
        </SidebarSection>

        <SidebarSection id="svgdraw-export" title="SVG">
            <PageSizeControls pageSize={pageSize} setPageSize={setPageSize} />
            <FileExportControls fileName={fileName} setFileName={setFileName} downloadCurrentSvg={downloadCurrentSvg} />
        </SidebarSection>

        {children}
    </>
}