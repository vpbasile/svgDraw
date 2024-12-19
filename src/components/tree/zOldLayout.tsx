import { Box, Button, Center, Collapse, Flex, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react";
import ColorModeButton from "../colorModeButton";

// Original Layout
const z = <Flex height="100vh" >
    {/* Canvas */}
    {/* Dynamic width when panel is open */}
    <Center id="canvas-box" flex={1} border="2px solid white" maxWidth={"calc(100vw - 300px)"}>
        <Text>SVG Goes Here</Text>
    </Center>

    {/* Control Panel */}
    <Box id="control-panel">
        <Button size="sm" mb={4} >"Show Controls"</Button>
        < Collapse in={true} animateOpacity >
            <Stack spacing={6}>
                <ColorModeButton />
                {/* Depth Controls */}
                <FormControl>
                    <Heading as="h2" size="md" mb={2} >
                        Depth: 8
                    </Heading>
                </FormControl>

                {/* Angle Controls */}
                <FormControl>
                    <FormLabel>Angle </FormLabel>
                    < Text > 1.5 </Text>
                </FormControl>

                {/* Palette Selector */}
                <FormControl>
                    <FormLabel>Choose Color Palette </FormLabel>
                    < Select value={"selectedPalette"} />
                </FormControl>
                {/* Download Controls */}
                <FormControl>
                    <FormLabel>Filename without extension </FormLabel>
                    <Button mt={2} colorScheme="teal" >
                        Download SVG
                    </Button>
                </FormControl>
            </Stack>
        </Collapse>
    </Box>
</Flex>