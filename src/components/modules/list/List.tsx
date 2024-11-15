import { useGetPodcasts } from "../../../api/useGetPodcasts";

import Card from "./card/card";
import Spinner from "../../shared/spinner/spinner";
import "./list.scss";

/**
 * Un componente List que muestra una lista de podcasts.
 *
 * El componente obtiene una lista de podcasts de la API de iTunes
 * y los muestra en un div con la clase "componentList". Si
 * los datos aún se están cargando, se muestra un componente Spinner
 * en su lugar.
 *
 * @returns {JSX.Element}
 */

export default function List() {
  const { PodcastList, loading } = useGetPodcasts();

  return (
    <div className="podList">
      <h1>Podcasts</h1>
      <div>{loading && <Spinner />}</div>
      <ol>
        {!loading &&
          PodcastList &&
          PodcastList.map((item, index) => <Card item={item} key={index} />)}
      </ol>
    </div>
  );
}
