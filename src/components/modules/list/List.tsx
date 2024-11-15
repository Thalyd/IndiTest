import { ITunesListItem, useGetPodcasts } from "../../../api/useGetPodcasts";

import Card from "./card/card";
import Spinner from "../../shared/spinner/spinner";
import "./list.scss";
import { useEffect, useState } from "react";
import { normalize } from "../../shared/utils/normalize";
import SearchTool from "./searchTool/searchTool";
import NoResults from "./noResults/noResults";

/**
 * Un componente funcional que muestra una lista de podcasts.
 *
 * Este componente obtiene una lista de podcasts del hook useGetPodcasts
 * y los muestra como tarjetas. Incluye una barra de búsqueda para filtrar
 * los podcasts mostrados por nombre o autor. Mientras se cargan los datos,
 * se muestra un indicador. Si ningún podcast coincide con los criterios de búsqueda,
 * se muestra un mensaje "Sin resultados".
 *
 * @returns {JSX.Element} Un div que contiene la lista de podcasts o un indicador de carga.
 */
export default function List() {
  const { podList, loading } = useGetPodcasts();

  const [List, setList] = useState<ITunesListItem[]>([]);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    setList(podList);
  }, [podList]);

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
