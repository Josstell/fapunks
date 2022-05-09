import { useCallback, useState, useEffect } from "react"
import useFaPunks from "../useFaPunks"

const getPunksData = async ({ tokenId, faPunks }) => {
	const [
		tokenURI,
		dna,
		owner,
		accessoriesType,
		clotheColor,
		clotheType,
		eyeType,
		eyeBrowType,
		facialHairColor,
		facialHairType,
		hairColor,
		hatColor,
		graphicType,
		mouthType,
		skinColor,
		topType,
	] = await Promise.all([
		faPunks.methods.tokenURI(tokenId).call(),
		faPunks.methods.tokenDNA(tokenId).call(),
		faPunks.methods.ownerOf(tokenId).call(),
		faPunks.methods.getAccessoriesType(tokenId).call(),
		faPunks.methods.getClotheColor(tokenId).call(),
		faPunks.methods.getClotheType(tokenId).call(),
		faPunks.methods.getEyeType(tokenId).call(),
		faPunks.methods.getEyeBrowType(tokenId).call(),
		faPunks.methods.getFacialHairColor(tokenId).call(),
		faPunks.methods.getFacialHairColor(tokenId).call(),
		faPunks.methods.getFacialHairType(tokenId).call(),
		faPunks.methods.getHairColor(tokenId).call(),
		faPunks.methods.getHatColor(tokenId).call(),
		faPunks.methods.getGraphicType(tokenId).call(),
		faPunks.methods.getMouthType(tokenId).call(),
		faPunks.methods.getSkinColor(tokenId).call(),
		faPunks.methods.getTopType(tokenId).call(),
	])
	const responseMetada = await fetch(tokenURI)
	const metadata = await responseMetada.json()
	return {
		tokenId,
		attributes: {
			accessoriesType,
			clotheColor,
			clotheType,
			eyeType,
			eyeBrowType,
			facialHairColor,
			facialHairType,
			hairColor,
			hatColor,
			graphicType,
			mouthType,
			skinColor,
			topType,
		},
		tokenURI,
		dna,
		owner,
		...metadata,
	}
}

// Plural
const useFaPunksData = () => {
	const [punks, setPunks] = useState([])
	const [loading, setLoading] = useState(true)
	const faPunks = useFaPunks()

	const update = useCallback(async () => {
		if (faPunks) {
			setLoading(true)

			let tokenIds

			const totalSupply = await faPunks.methods.totalSupply().call()
			tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index)
			const punksPromise = tokenIds.map((tokenId) =>
				getPunksData({ tokenId, faPunks })
			)

			const punks = await Promise.all(punksPromise)

			console.log("punks:  ", punks)

			setPunks(punks)
			setLoading(false)
		}
	}, [faPunks])

	useEffect(() => {
		update()
	}, [update])

	return {
		loading,
		punks,
		update,
	}
}

// Singular
const useFaPunkData = (tokenId) => {
	const [punk, setPunk] = useState({})
	const [loading, setLoading] = useState(true)
	const faPunks = useFaPunks()

	const update = useCallback(async () => {
		if (faPunks && tokenId != null) {
			setLoading(true)
			const toSet = await getPunksData({ tokenId, faPunks })
			setPunk(toSet)

			setLoading(false)
		}
	}, [faPunks, tokenId])

	useEffect(() => {
		update()
	}, [update])

	return {
		loading,
		punk,
		update,
	}
}

export { useFaPunksData, useFaPunkData }
