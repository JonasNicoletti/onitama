import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
 shadows: {
  selected: 'rgba(208, 218, 142, 0.2) 0px 4px 16px, rgba(208, 218, 142, 0.4) 0px 8px 24px, rgba(208, 218, 142, 0.8) 0px 16px 56px'
 }
})


const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)