import { useParams } from "react-router-dom"



export default function Podcast(){

    const id = useParams().podcastId

    return (
        <div className="componentPodcast">Podcast {id}</div>
    )
}