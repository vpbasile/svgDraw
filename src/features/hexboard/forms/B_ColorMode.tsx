import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, useColorMode } from "@chakra-ui/react"

export default function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  const buttonIcon = colorMode === 'light' ? <SunIcon /> : <MoonIcon />
  return (
    <Button onClick={toggleColorMode} rightIcon={buttonIcon}>
      Color Mode: 
    </Button>
  )
}