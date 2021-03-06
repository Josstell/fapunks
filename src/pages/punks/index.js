import { useWeb3React } from "@web3-react/core"
import { Grid } from "@chakra-ui/react"
import PunkCard from "../../components/punk-card"
import Loading from "../../components/loading"
import RequestAccess from "../../components/request-access"
import { useFaPunksData } from "../../hooks/useFaPunksData"
import Link from "next/link"

const Punks = () => {
	const { active } = useWeb3React()
	const { punks, loading } = useFaPunksData()

	if (!active) return <RequestAccess />

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
					{punks.map(({ name, image, tokenId }) => (
						<Link key={tokenId} href={`/punks/${tokenId}`}>
							<PunkCard image={image} name={name} />
						</Link>
					))}
				</Grid>
			)}
		</>
	)
}

export default Punks
