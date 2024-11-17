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
      : <div className="card">
          <div>{Podcast.image}</div>
          <div>{Podcast.name}</div>
          <div>{Podcast.author}</div>
          <div>{Podcast.description}</div>
        </div>
      }
    </div>
  );
}
