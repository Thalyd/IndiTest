import { useParams } from "react-router-dom";
import "./episode.scss";
import { useGetPodcastSingle } from "@Api/useGetPodcastSingle";
import Spinner from "@Components/spinner/spinner";
import Player from "./player";

/**
 * Un componente que muestra un episodio de un podcast.
 *
 * Este componente espera que se pasen dos parámetros en la URL:
 * - `podcastId`: el ID del podcast al que pertenece el episodio.
 * - `episodeId`: el ID del episodio que se mostrará.
 *
 * El componente obtiene los datos del episodio utilizando el gancho `useGetPodcastSingle` y
 * muestra el título del episodio, la descripción y un reproductor para el audio del episodio.
 *
 * Si los datos del episodio no están disponibles (es decir, la obtención aún está en proceso o el
 * episodio no existe), el componente muestra un indicador.
 *
 * @returns {JSX.Element} Un elemento JSX que contiene los datos del episodio y un reproductor.
 */
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
        <Player audio={Episode.url} />
      </div>
    </div>
  );
}
