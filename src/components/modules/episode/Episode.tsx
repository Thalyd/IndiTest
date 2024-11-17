import { useParams } from "react-router-dom";
import "./episode.scss";
import { useGetPodcastSingle } from "@Api/useGetPodcastSingle";
import Spinner from "@Components/spinner/spinner";

export default function Episode() {
  const podcastId = useParams().podcastId;
  const episodeId = useParams().episodeId;

  const { loading, getEpisode } = useGetPodcastSingle({ id: podcastId });

  const Episode = getEpisode(podcastId, episodeId) ?? false;

  if (loading || !Episode) return <Spinner />;

  const formattedDescription = Episode.description.replace(
    /(https?:\/\/[^\s]+)/g,
    url =>
      `<a class="link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );

  return (
    <div className="Episode">
      <div className="card">
        <h1>{Episode.title}</h1>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: formattedDescription,
          }}
        />
      </div>
    </div>
  );
}
