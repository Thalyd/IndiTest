import { ITunesListItem, useGetPodcasts } from "../../../api/useGetPodcasts";

import Card from "./card/card";
import Spinner from "../../shared/spinner/spinner";
import "./list.scss";
import { useEffect, useState } from "react";
import { normalize } from "../../shared/utils/normalize";
import SearchTool from "./searchTool/searchTool";
import NoResults from "./noResults/noResults";

/**
 * Un componente List que muestra una lista de podcasts.
 *
 * El componente obtiene la lista de podcasts de la API de iTunes
 * y muestra una lista de tarjetas, cada una representando un podcast. El
 * componente también muestra una barra de búsqueda para filtrar la lista de podcasts.
 *
 * @returns {JSX.Element} un div con la clase "componentList"
 * que contiene la lista de podcasts
 */
export default function List() {
  const { PodcastList, loading } = useGetPodcasts();

  const [List, setList] = useState<ITunesListItem[]>([]);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    setList(PodcastList);
  }, [PodcastList]);

  function Search(value: ITunesListItem) {
    return (
      normalize(value.name).includes(normalize(filtering)) ||
      normalize(value.author).includes(normalize(filtering))
    );
  }

  return (
    <div className="podList">
      {loading ?
        <Spinner />
      : <div>
          <SearchTool
            UpdateParent={setFiltering}
            Count={List.filter(Search).length}
          />
          <ol>
            {!loading &&
              List &&
              List.filter(Search).map((item, index) => (
                <Card item={item} key={index} />
              ))}
          </ol>
          {List.filter(Search).length === 0 && <NoResults />}
        </div>
      }
    </div>
  );
}
