import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { BASE_PATH, featureModules } from './featureRegistry';

export default function ModuleIndex() {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Open module menu"
                icon={<HamburgerIcon />}
                variant="ghost"
                size="sm"
            />
            <MenuList>
                {featureModules.map(({ segment, label, navChildren }) => (
                    navChildren && navChildren.length > 0 ? (
                        navChildren.map(({ path, label: childLabel }) => (
                            <MenuItem as={RouterLink} to={`${BASE_PATH}/${segment}/${path}`} key={path}>
                                {label}: {childLabel}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem as={RouterLink} to={`${BASE_PATH}/${segment}`} key={segment}>
                            {label}
                        </MenuItem>
                    )
                ))}
                <MenuDivider />
                <MenuItem as="a" href="https://github.com/vpbasile/svgDraw" target="_blank" rel="noreferrer">
                    Repo <ExternalLinkIcon mx="2px" />
                </MenuItem>
                <MenuItem as="a" href="https://vpbasile.github.io/svgDraw/" target="_blank" rel="noreferrer">
                    Live <ExternalLinkIcon mx="2px" />
                </MenuItem>
            </MenuList>
        </Menu>
    );
}