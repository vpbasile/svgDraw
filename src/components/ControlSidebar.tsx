import { Box, HStack, Heading, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { PageSizeKey } from "../config/pageSizeSettings";
import SVGDrawControls from "../modules/hexboard/forms/F_SVGDraw";
import ModuleIndex from "./ModuleIndex";

type ControlSidebarProps = {
  title: string;
  children?: ReactNode;
  defaultPageSize?: PageSizeKey;
};

export default function ControlSidebar({ title, children, defaultPageSize }: ControlSidebarProps) {
  const sidebarBg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const titleColor = useColorModeValue("gray.700", "gray.100");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputBg = useColorModeValue("white", "gray.800");
  const radioAccent = useColorModeValue("#2b6cb0", "#63b3ed");

  return (
    <Box
      width={320}
      minWidth={320}
      maxWidth={320}
      height="100vh"
      overflowY="auto"
      borderLeft="1px solid"
      borderColor={borderColor}
      bg={sidebarBg}
      p={3}
      sx={{
        "select, input[type='text'], input[type='number']": {
          width: "100%",
          minHeight: "32px",
          border: "1px solid",
          borderColor: inputBorderColor,
          borderRadius: "md",
          background: inputBg,
          paddingLeft: "8px",
          paddingRight: "8px",
        },
        "input[type='radio']": {
          accentColor: radioAccent,
        },
      }}
    >
      <HStack mb={3} align="center">
        <ModuleIndex />
        <Heading size="sm" color={titleColor} letterSpacing="wide">
          Module: {title}
        </Heading>
      </HStack>
      <SVGDrawControls defaultPageSize={defaultPageSize}>
        {children ?? <Box>No controls</Box>}
      </SVGDrawControls>
    </Box>
  );
}
