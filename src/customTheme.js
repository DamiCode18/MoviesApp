// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react'

// 2. Define the new text styles
const customTheme = extendTheme({
  textStyles: {
    h1: {
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
})

export default customTheme;