import { useParams } from "react-router-dom";
import "./podcast.scss";
import { useGetPodcastSingle } from "@Api/useGetPodcastSingle";
import Spinner from "@Components/spinner/spinner";

import Table from "./table";
import Count from "./count";
import Info from "./info";

interface PodcastProps {
  clear?: boolean;
}
export default function Podcast({ clear = false }: PodcastProps) {
  const id = useParams().podcastId;

  const { loading, getPodcast } = useGetPodcastSingle({ id });

  const Podcast = getPodcast(id) ?? false;

  if (loading || !Podcast) return <Spinner />;

  return (
    <div className={"Podcast" + (clear ? " inherit" : "")}>
      <Info podcast={Podcast} clear={clear} />
      {!clear && (
        <div className="episodes">
          <Count amount={Podcast.count} />
          <Table list={Podcast.episodes} />
        </div>
      )}
    </div>
  );
}
