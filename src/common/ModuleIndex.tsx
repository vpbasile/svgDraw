import { LinkIcon } from '@chakra-ui/icons';
import { Heading, Link, List, ListItem } from '@chakra-ui/react';
import { BASE_PATH, featureModules } from './featureRegistry';

export default function ModuleIndex() {
    return <>
        <Heading as={'h2'}>Modules</Heading>
        <List>
            {featureModules.map(({ segment, label, navChildren }) => (
                <ListItem key={segment}>
                    <LinkIcon /> <Link href={`${BASE_PATH}/${segment}`}>{label}</Link>
                    {navChildren && navChildren.length > 0 && (
                        <List>
                            {navChildren.map(({ path, label: childLabel }) => (
                                <ListItem key={path}>
                                    <LinkIcon /> <Link href={`${BASE_PATH}/${segment}/${path}`}>{label}: {childLabel}</Link>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </ListItem>
            ))}
            <ListItem>GitHub:
                <List>
                    <ListItem><LinkIcon /><Link href='https://github.com/vpbasile/svgDraw'>Repo on Github</Link></ListItem>
                    <ListItem><LinkIcon /><Link href='https://vpbasile.github.io/svgDraw/'>Live version on Github Pages</Link></ListItem>
                </List>
            </ListItem>

        </List>
    </>
}