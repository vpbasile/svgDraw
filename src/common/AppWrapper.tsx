import {
  Box,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import ModuleIndex from "./ModuleIndex";

type AppWrapperProps<TState> = {
  title: string;

  /** Initial state owned by the wrapper */
  initialState: TState;

  /** Renders the SVG based on current state */
  renderSVG: (state: TState) => ReactNode;

  /** Renders controls that mutate the state */
  renderControls?: (
    state: TState,
    setState: React.Dispatch<React.SetStateAction<TState>>
  ) => ReactNode;
};

export default function AppWrapper<TState>({
  title,
  initialState,
  renderSVG,
  renderControls,
}: AppWrapperProps<TState>) {
  const [state, setState] = useState<TState>(initialState);

  return (
    <Flex height="100vh">
      {/* SVG AREA */}
      <Center flex={1} bg="gray.50">
        {renderSVG(state)}
      </Center>

      {/* CONTROL PANEL */}
      <Box
        width={320}
        height="100vh"
        overflowY="auto"
        borderLeft="1px solid"
        borderColor="gray.200"
        p={3}
      >
        <Heading size="md" mb={3}>
          {title}
        </Heading>
        {ModuleIndex()}
        {renderControls
          ? renderControls(state, setState)
          : <Box>No controls</Box> } 
      </Box>
    </Flex>
  );
}
