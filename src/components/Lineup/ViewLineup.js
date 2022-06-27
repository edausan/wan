import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {GetSingleLineup} from "../../Firebase/songsApi"
import LineupItem from "./LineupItem"

const ViewLineup = () => {
	const params = useParams()
	const [lineup, setLineup] = useState(null)

	useEffect(() => {
		handleGetLineup()
	}, [])

	const handleGetLineup = async () => {
		const id = params.id
		const lineup = await GetSingleLineup({id})
		setLineup(lineup)
		console.log({lineup})
	}

	return <div>{lineup && <LineupItem lineup={lineup} isSongsExpanded />}</div>
}

export default ViewLineup
