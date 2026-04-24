import {
    Center,
    Flex,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import ControlSidebar from "./ControlSidebar";

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
      <Center id="canvas-box" flex={1}>
        {renderSVG(state)}
      </Center>

      {/* CONTROL PANEL */}
      <ControlSidebar title={title}>
        {renderControls ? renderControls(state, setState) : undefined}
      </ControlSidebar>
    </Flex>
  );
}
