import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import ControlSidebar from "./ControlSidebar";
import { PAGE_SIZES, PageSizeKey } from "./pageSizeSettings";
import { useCanvasZoom } from "./useCanvasZoom";

type AppWrapperProps<TState> = {
  title: string;
  defaultPageSize?: PageSizeKey;

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
  defaultPageSize,
  initialState,
  renderSVG,
  renderControls,
}: AppWrapperProps<TState>) {
  const [state, setState] = useState<TState>(initialState);
  const { zoomToArea } = useCanvasZoom();

  // Auto-zoom to page when module loads or defaultPageSize changes
  useEffect(() => {
    if (!defaultPageSize || defaultPageSize === 'none') return;
    
    const size = PAGE_SIZES[defaultPageSize];
    if (!size) return;

    // Wait a tick for the SVG to be rendered
    const timer = setTimeout(() => {
      zoomToArea(-size.width / 2, -size.height / 2, size.width, size.height);
    }, 0);

    return () => clearTimeout(timer);
  }, [defaultPageSize, zoomToArea]);

  return (
    <Flex height="100vh">
      {/* SVG AREA */}
      <Box id="canvas-box" flex={1} minW={0} minH={0} overflow="hidden">
        <Box width="100%" height="100%">
          {renderSVG(state)}
        </Box>
      </Box>

      {/* CONTROL PANEL */}
      <ControlSidebar title={title} defaultPageSize={defaultPageSize}>
        {renderControls ? renderControls(state, setState) : undefined}
      </ControlSidebar>
    </Flex>
  );
}
