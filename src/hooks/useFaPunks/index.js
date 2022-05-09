import { useMemo } from "react"
import { useWeb3React } from "@web3-react/core"

import FaPunksArtifact from "../../config/web3/artifacts/faPunks"

const { address, abi } = FaPunksArtifact

const useFaPunks = () => {
	const { active, library, chainId } = useWeb3React()

	return useMemo(() => {
		if (active) return new library.eth.Contract(abi, address[chainId])
		else return null
	}, [active, chainId, library?.eth?.Contract])
}

export default useFaPunks
