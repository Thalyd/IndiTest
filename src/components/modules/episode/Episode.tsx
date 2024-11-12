import { useParams } from "react-router-dom"



export default function Episode(){
    const id = useParams().episodeId

    return (
        <div className="componentEpisode">Episode {id}</div>
    )
}