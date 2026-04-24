import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import SVGDrawControls from "../features/hexboard/forms/F_SVGDraw";
import ModuleIndex from "./ModuleIndex";

type ControlSidebarProps = {
  title: string;
  children?: ReactNode;
};

export default function ControlSidebar({ title, children }: ControlSidebarProps) {
  return (
    <Box
      width={320}
      minWidth={320}
      maxWidth={320}
      height="100vh"
      overflowY="auto"
      borderLeft="1px solid"
      borderColor="gray.200"
      p={3}
    >
      <Heading size="md" mb={3}>
        {title}
      </Heading>
      <ModuleIndex />
      <SVGDrawControls />
      {children ?? <Box>No controls</Box>}
    </Box>
  );
}
