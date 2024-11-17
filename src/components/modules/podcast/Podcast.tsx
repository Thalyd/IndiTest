import { useParams } from "react-router-dom";
import "./podcast.scss";
import { useGetPodcastSingle } from "@Api/useGetPodcastSingle";
import Spinner from "@Components/spinner/spinner";

export default function Podcast() {
  const id = useParams().podcastId;

  const { loading, getPodcast } = useGetPodcastSingle({ id });

  const Podcast = getPodcast(id) ?? false;

  console.log("Podcast", Podcast);

  return (
    <div className="Podcast">
      {loading || !Podcast ?
        <Spinner />
      : <h1>{Podcast.name}</h1>}
    </div>
  );
}
