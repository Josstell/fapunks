import { ChakraProvider } from "@chakra-ui/react"
import { Web3ReactProvider } from "@web3-react/core"
import MainLayout from "../components/layouts/main"
import { getLibrary } from "../config/web3"

function MyApp({ Component, pageProps }) {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<ChakraProvider>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ChakraProvider>
		</Web3ReactProvider>
	)
}

export default MyApp
