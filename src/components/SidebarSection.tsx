import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, useColorModeValue } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

type SidebarSectionProps = {
	id: string;
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
	alwaysAccordion?: boolean;
	flat?: boolean;
};

const SidebarSectionDepthContext = createContext(0);

export default function SidebarSection({ id, title, children, defaultOpen = false, alwaysAccordion = false, flat = false }: SidebarSectionProps) {
	const depth = useContext(SidebarSectionDepthContext);
	const cardBg = useColorModeValue("white", "gray.800");
	const headerBg = useColorModeValue("gray.50", "gray.700");
	const headerColor = useColorModeValue("gray.700", "gray.100");
	const borderColor = useColorModeValue("gray.200", "gray.600");
	const headerBorderColor = useColorModeValue("gray.100", "gray.600");
	const nestedContent = (
		<SidebarSectionDepthContext.Provider value={depth + 1}>
			{children}
		</SidebarSectionDepthContext.Provider>
	);

	if (depth > 0 && !alwaysAccordion) {
		return (
			<Box id={id} border="1px solid" borderColor={borderColor} borderRadius="md" bg={cardBg} boxShadow="sm" mb={3} overflow="hidden">
				<Box px={3} py={2} fontWeight="semibold" fontSize="sm" color={headerColor} bg={headerBg} borderBottom="1px solid" borderColor={headerBorderColor}>
					{title}
				</Box>
				<Box px={3} py={3} display="flex" flexDirection="column" gap={3}>
					{nestedContent}
				</Box>
			</Box>
		);
	}

	if (flat) {
		return (
			<Box id={id} mb={3}>
				<Box px={1} py={2} fontWeight="semibold" fontSize="sm" color={headerColor}>
					{title}
				</Box>
				<Box px={0} py={1} display="flex" flexDirection="column" gap={3}>
					{nestedContent}
				</Box>
			</Box>
		);
	}

	return (
		<Accordion allowToggle defaultIndex={defaultOpen ? [0] : undefined} mb={3}>
			<AccordionItem id={id} border="1px solid" borderColor={borderColor} borderRadius="md" bg={cardBg} boxShadow="sm" overflow="hidden">
				<h2>
					<AccordionButton px={3} py={2} _hover={{ bg: headerBg }} _expanded={{ bg: headerBg }}>
						<Box as="span" flex="1" textAlign="left" fontWeight="semibold" fontSize="sm" color={headerColor}>
							{title}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel px={3} py={3} display="flex" flexDirection="column" gap={3}>
					{nestedContent}
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}