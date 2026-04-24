import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type SidebarSectionProps = {
	id: string;
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
};

export default function SidebarSection({ id, title, children, defaultOpen = false }: SidebarSectionProps) {
	return (
		<Accordion allowToggle defaultIndex={defaultOpen ? [0] : undefined} mb={3}>
			<AccordionItem id={id} border="1px solid" borderColor="gray.200" borderRadius="md">
				<h2>
					<AccordionButton px={3} py={2}>
						<Box as="span" flex="1" textAlign="left" fontWeight="semibold">
							{title}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel px={3} pb={3}>
					{children}
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}