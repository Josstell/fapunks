import Web3 from "web3"
import { InjectedConnector } from "@web3-react/injected-connector"

const connector = new InjectedConnector({ supportedChainIds: [4] })

function getLibrary(provider) {
	return new Web3(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

export { getLibrary, connector }
