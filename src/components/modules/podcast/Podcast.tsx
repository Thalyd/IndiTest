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
/**
 * Un componente que muestra la información de un podcast.
 *
 * Este componente utiliza el gancho `useGetPodcastSingle` para obtener los
 * datos del podcast a partir del `podcastId` proporcionado en la URL. Muestra
 * la información del podcast, incluyendo el título, autor y descripción, y una
 * lista de episodios si el `clear` es falso.
 *
 * @param {PodcastProps} props
 * - clear: un booleano opcional que determina si se deben mostrar los episodios.
 *   El valor predeterminado es falso.
 *
 * @returns {JSX.Element} Un elemento JSX que contiene la información del
 * podcast y, opcionalmente, los episodios.
 */
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
